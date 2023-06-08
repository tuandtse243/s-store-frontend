'use client'
import { deleteObjectStore, openDatabase, retrieveData } from '@/helpers/ConnectIndexedDB/SaveInIndexedDB';
import Footer from '@/src/component/Footer/Footer';
import Header from '@/src/component/Header/Header';
import styles from '@/src/styles/styles'
import Province from '../../public/address/tinh_tp.json'
import District from '../../public/address/quan_huyen.json';
import Town from '../../public/address/xa_phuong.json'
import { Input, Space, Tag, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { server } from '@/server';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import axios from 'axios';
const { CheckableTag } = Tag;

const OrderCustomShoes = () => {
    const [images, setImages] = useState([])
    const [select, setSelect] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [count, setCount] = useState(1);
    const start = 25;
    const end = 42;

    const [nameShoes, setNameShoes] = useState('');

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [town, setTown] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [typeAddress, setTypeAddress] = useState("");

    const router = useRouter();
    const user = useAuth((state) => state.auth);
    const token = useRef();

    useEffect(() => {
        openDatabase();
        token.current = localStorage.getItem("token");
    }, [])

    useEffect(() => {
        const request = window.indexedDB.open('myDatabase', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            retrieveData(db)
              .then((data) => {
                const imagesIndexedDB = data?.map((item) => item.base64)
                setImages(imagesIndexedDB) // Process the retrieved data
              })
              .catch((error) => {
                console.error(error); // Handle the error if retrieval fails
              });
        };
    }, [])

    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
          ? [ tag ]
          : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
    };

    const incrementCount = () => {
        setCount(count + 1);
      };
    
      const decrementCount = () => {
        if (count > 1) {
          setCount(count - 1);
        }
    };

    const paymentSubmit = async (e) => {
        e.preventDefault();
       if(province === "" || district === "" || town === "" || street === "" || houseNumber === "" || name === "" || phone === "" || email === "" || typeAddress === "" || selectedTags.length === 0){
          notification.error({message: "Vui lòng nhập đầy đủ thông tin nhận hàng!"})
       } else {
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

          const cart = [{
            nameShoes: nameShoes,
            quantity: count,
            unitPrice: 1500000,
            size: selectedTags[0],
            category: 'custom-shoes',
          }]

          const totalPrice = 1500000 * count;
          const shippingFee = totalPrice * 0.1;
          const discountPrice = 0;
    
          const orderData = {
            cart,
            shippingAddress,
            user,
            totalPrice,
            shippingFee,
            discountPrice,
          };
    
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token.current}`,
            },
          };
    
          orderData.status = "WAITING PAYMENT"
        //   console.log(orderData)
    
          await axios
            .post(`${server}/order/create-order`, orderData, config)
            .then((res) => {
                localStorage.setItem("latestOrder", JSON.stringify(res.data?.order));
                const request = window.indexedDB.open('myDatabase', 1);
                request.onsuccess = (event) => {
                    const db = event.target.result;

                    // Call deleteObjectStore function with the desired object store name
                    const objectStoreToDelete = 'ImageStore';
                    deleteObjectStore(db, objectStoreToDelete);
                };
                router.push("/payment");
          });
       }
    };

  return (
    <div>
        <Header activeHeading={4}/>
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-10">
            <div className="block w-full 800px:flex mt-10">
              <div className="w-full 800px:w-[50%] text-center">
                <img
                  src={`data:image/jpeg;base64,${images[select]}`}
                  alt=""
                  className="w-[100%]"
                />
                <div className="w-full flex mt-5">
                  {images.map((i, index) => (
                      <div
                        className={`${
                          select === index ? "border" : "null"
                        } cursor-pointer p-2 flex justify-center align-middle`}
                      >
                        <img
                          src={`data:image/jpeg;base64,${i}`}
                          alt=""
                          className="h-[220px] w-[220px] overflow-hidden"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] ml-[30px]">
                <h4 className={`${styles.productTitle} italic hover:underline hover:cursor-pointer`}>Custom-Shoes</h4>
                <div>
                    <label className="block pb-2">Đặt tên giày của bạn</label>
                    <Input value={nameShoes} onChange={(e) => setNameShoes(e.target.value)} className={`${styles.productTitle}`}></Input>
                </div>

              <div style={{marginTop: '20px'}}>
                <span style={{ marginRight: 8 }}>Chọn size</span>
                <Space size={[0, 8]} wrap>
                  {Array.from({ length: end - start + 1 }, (_, index) => start + index).map((tag) => (
                    <CheckableTag
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={(checked) => handleChange(tag, checked)}
                    >
                      {tag}
                    </CheckableTag>
                  ))}
                </Space>
              </div>

                <div className="pt-3">
                  <h3 className={`${styles.productDiscountPrice}`}>
                    Giá: 1500000đ
                  </h3>
                </div>

                <div className="flex items-center mt-5 justify-between pr-3">
                    Số lượng:
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 pt-[9px] pb-[9.7px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                <ShippingInfo
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    email={email}
                    setEmail={setEmail}
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

                <div className='flex justify-end'>
                    <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={paymentSubmit}
                    >
                    <span className="text-white flex items-center">
                        Đặt hàng <AiOutlineShoppingCart className="ml-1" />
                    </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

const ShippingInfo = ({
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
      <div className="w-full 800px:w-[100%] bg-white rounded-md p-5 pb-8 mt-5">
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
  

export default OrderCustomShoes