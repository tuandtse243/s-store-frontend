'use client'
import React, { useState, useEffect } from "react";
import styles from "@/src/styles/styles";
import { Country, State } from "country-state-city";
import axios from "axios";
import { server } from "@/server"; 
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";

const Checkout = () => {
  const router = useRouter();

  const user = useAuth((state) => state.auth);
  const cart = useCart((state) => state.cart);

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
  const [discountPrice, setDiscountPrice] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
   if(province === "" || district === "" || town === "" || street === "" || houseNumber === "" || name === "" || phone === "" || email === "" || typeAddress === ""){
      notification.error({message: "Vui lòng nhập đầy đủ thông tin nhận hàng!"})
   } else{
        const shippingAddress = {
            name,
            phone,
            email,
            province,
            district,
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
        shipping,
        discountPrice,
        }

        console.log(orderData)

    // update local storage with the updated orders array
    // localStorage.setItem("latestOrder", JSON.stringify(orderData));
    router.push("/payment");
   }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item?.price,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

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
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

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
            shipping={shipping}
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
        <h5 className="text-white">Thanh Toán</h5>
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
              onChange={(e) => setProvince(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn tỉnh/thành phố
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
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
              {State &&
                State.getStatesOfCountry(province).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
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
              <option key='HCM' value="HCM">
                Hồ Chí Minh
              </option>
              {/* {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))} */}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Loại địa chỉ</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={typeAddress}
              onChange={(e) => setTypeAddress(e.target.value)}
            >
              <option className="block pb-2" value="">
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
      {/* <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Chọn địa chỉ mặc định
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )} */}
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
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tiền vận chuyển:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Giảm giá:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
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
