'use client'
import React, { useState, useEffect, useRef } from "react";
import styles from "@/src/styles/styles";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { server } from "@/server"; 
import { notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";

const Payment = () => {
  const searchParams = useSearchParams();
  const typeBooking = searchParams.get('typeBooking');

  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useAuth((state) => state.auth);
  const setCart = useCart((state) => state.setCart)
  const router = useRouter();
  const token = useRef();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    token.current = localStorage.getItem("token");
    setOrderData(orderData);
  }, []);

  // const order = {
  //   cart: orderData?.cart,
  //   shippingAddress: orderData?.shippingAddress,
  //   user: user && user,
  //   totalPrice: orderData?.totalPrice,
  // };

  const cashOnDeliveryHandler = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.current}`,
      },
    };

    orderData.paymentInfo = {
      status: 'WAITING',
      type: "Cash On Delivery",
    };

    orderData.status = "PROCESSING";

    // console.log(orderData)

    axios.post(`${server}/order/update-order`, orderData, config)
      .then((res) => {
        setOpen(false);
        notification.success({message: "Order successful!"});
        // setCart([])
        // localStorage.setItem("latestOrder", JSON.stringify([]));
        // console.log(res.data)
        router.push('/order-success?typeOrder=cashOnDelivery')
      });
  };

  const momoHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    orderData.paymentInfo = {
      status: 'WAITING',
      type: "Momo",
    };

    const res = await axios.post(`${server}/momo/create-payment`, orderData, config);
    const payUrl = res.data?.payUrl?.paymentUrl;
    localStorage.setItem("latestOrder", JSON.stringify(res.data?.newOrder));
    // console.log(payUrl)

    router.push(payUrl);
  }

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            momoHandler={momoHandler}
            typeBooking={typeBooking}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  cashOnDeliveryHandler,
  momoHandler,
  typeBooking
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      

      <br />
      {/* momo payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Thanh toán Momo
          </h4>
        </div>

        {/* pay with momo */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={momoHandler}
            >
              Xác nhận
            </div>
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      {
        typeBooking === 'custom' ? '' : 
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Thanh toán khi giao hàng
            </h4>
          </div>

          {/* cash on delivery */}
          {select === 3 ? (
            <div className="w-full flex">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <input
                  type="submit"
                  value="Xác nhận"
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>
      }
    </div>
  );
};

const CartData = ({ orderData }) => {
  // const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng tiền:</h3>
        <h5 className="text-[18px] font-[600]">{Math.ceil(orderData?.totalPrice - orderData?.shippingFee)} VNĐ</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tiền vận chuyển:</h3>
        <h5 className="text-[18px] font-[600]">{Math.ceil(orderData?.shippingFee)} VNĐ</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Giảm giá:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "$" + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {Math.ceil(orderData?.totalPrice)} VNĐ
      </h5>
      <br />
    </div>
  );
};

export default Payment;
