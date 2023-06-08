'use client'
import React, { useState, useEffect, useRef } from "react";
import styles from "@/src/styles/styles";
import axios from "axios";
import { server } from "@/server"; 
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";
import Province from '../../../public/address/tinh_tp.json';
import District from '../../../public/address/quan_huyen.json';
import Town from '../../../public/address/xa_phuong.json'

const Checkout = () => {
  const router = useRouter();

  const user = useAuth((state) => state.auth);
  const cart = useCart((state) => state.cart);
  const setCart = useCart((state) => state.setCart);

  const [userInfo, setUserInfo] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [typeAddress, setTypeAddress] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);


  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);

  const paymentSubmit = async (e) => {
    e.preventDefault();
   if(province === "" || district === "" || town === "" || street === "" || houseNumber === "" || name === "" || phone === "" || email === "" || typeAddress === ""){
      notification.error({message: "Vui lòng nhập đầy đủ thông tin nhận hàng!"})
   } else{
      const shippingAddress = {
          name,
          phone,
          email,
          province: province.split(',')[1],
          district: district.split(',')[1],
          town,
          street,
          houseNumber,
          typeAddress
      };

      const orderData = {
      cart,
      shippingAddress,
      user,
      totalPrice,
      subTotalPrice,
      shippingFee,
      discountPrice,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };

      orderData.status = "WAITING PAYMENT"

      await axios
        .post(`${server}/order/create-order`, orderData, config)
        .then((res) => {
          setCart([]);
          localStorage.setItem("latestOrder", JSON.stringify(res.data?.order));
          console.log(res.data?.order)
          router.push("/payment");
      });
   }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item?.discountPrice,
    0
  );

  // this is shippingFee cost variable
  const shippingFee = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          notification.error({message: "Coupon code is not valid for this shop"});
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        notification.error({message: "Coupon code doesn't exists!"});
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shippingFee - discountPercentenge)
    : (subTotalPrice + shippingFee);

  console.log(discountPercentenge);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            userInfo={userInfo}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            setUserInfo={setUserInfo}
            province={province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
            town={town}
            setTown={setTown}
            street={street}
            setStreet={setStreet}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            typeAddress={typeAddress}
            setTypeAddress={setTypeAddress}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shippingFee}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Đặt hàng</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  userInfo,
  setUserInfo,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  province,
  setProvince,
  district,
  setDistrict,
  town,
  setTown,
  street,
  setStreet,
  houseNumber,
  setHouseNumber,
  typeAddress,
  setTypeAddress
}) => {
  const Provinces = Object.values(Province);
  const Districts = Object.values(District);
  // const provinceCode = useRef("");
  // console.log(provinceCode)
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Thông tin giao hàng</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Số điện thoại</label>
            <input
              type="number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[97.5%]">
            <label className="block pb-2">Địa chỉ email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Tỉnh/Thành phố</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={province}
              onChange={(e) => {
                console.log(e.target.value.split(',')[0])
                setProvince(e.target.value)
                }}
            >
              <option className="block pb-2">
                Chọn tỉnh/thành phố
              </option>
              {Provinces &&
                Provinces.map((item) => (
                  <option key={item.code} value={[item.code, item.name]}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Quận/Huyện</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn quận/huyện
              </option>
              {Districts &&
                Districts.filter((item) => item.parent_code === province.split(',')[0]).map((item) => (
                  <option key={item.code} value={[item.code, item.name]}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phường/Xã</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            >
              <option className="block pb-2" key='abc' value="abc">
                Chọn phường/xã
              </option>
              {Object.values(Town).filter((item) => item.parent_code === district.split(',')[0]).map((item) => (
                  <option key={item.code} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Loại địa chỉ</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={typeAddress}
              onChange={(e) => {
                console.log(e.target.value)
                setTypeAddress(e.target.value)
                }}
            >
              <option className="block pb-2">
                Chọn loại địa chỉ
              </option>
                <option key='home' value='home'>
                    Nhà riêng
                </option>
                <option key='office' value='office'>
                    Văn phòng
                </option>
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Số nhà</label>
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Tên đường</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div></div>
      </form>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng tiền:</h3>
        <h5 className="text-[18px] font-[600]">{Math.ceil(subTotalPrice)} VNĐ</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tiền vận chuyển:</h3>
        <h5 className="text-[18px] font-[600]">{Math.ceil(shipping)} VNĐ</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Giảm giá:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">{Math.ceil(totalPrice)} VNĐ</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
