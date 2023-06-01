'use client'
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url, server } from "@/server";
import styles from "@/src/styles/styles";


// import Ratings from "./Ratings";
import axios from "axios";
import Link from "next/link";
import { Space, Tag, notification } from "antd";
import { useCart } from "@/store/cart";

const { CheckableTag } = Tag;

const ProductDetails = ({ data }) => {
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { user, isAuthenticated } = useSelector((state) => state.user);
  // const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const cart = useCart((state) => state.cart);
  const setCart = useCart((state) => state.setCart);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [ tag ]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  // useEffect(() => {
  //   dispatch(getAllProductsShop(data && data?.shop._id));
  //   if (wishlist && wishlist.find((i) => i._id === data?._id)) {
  //     setClick(true);
  //   } else {
  //     setClick(false);
  //   }
  // }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      notification.error({message: "Sản phẩm đã tồn tại trong giỏ hàng!"});
    } else {
      if (data.stock < 1) {
        notification.error({message: "Số lượng còn lại không đủ!"});
      } else {
        const cartData = { ...data, qty: count, size: selectedTags[0] };
        setCart([...cart, cartData]);
        notification.success({message: "Thêm sản phẩm vào giỏ thành công!"});
      }
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-10">
            <div className="block w-full 800px:flex mt-10">
              <div className="w-full 800px:w-[50%] text-center">
                <img
                  src={`${data && data.images[select]}`}
                  alt=""
                  className="w-[100%]"
                />
                <div className="w-full flex mt-5">
                  {data && data.images.map((i, index) => (
                      <div
                        className={`${
                          select === index ? "border" : "null"
                        } cursor-pointer p-2 flex justify-center align-middle`}
                      >
                        <img
                          src={i}
                          alt=""
                          className="h-[220px] w-[220px] overflow-hidden"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] ml-[30px]">
                <h4 className={`${styles.productTitle} italic hover:underline hover:cursor-pointer`}>{data.category}</h4>
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>

                <span style={{ marginRight: 8 }}>Size:</span>
                <Space size={[0, 8]} wrap>
                  {data.sizes.map((tag) => (
                    <CheckableTag
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={(checked) => handleChange(tag, checked)}
                    >
                      {tag}
                    </CheckableTag>
                  ))}
                </Space>

                <div className="pt-3">
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "đ" : null}
                  </h3>
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}đ
                  </h4>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
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
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Thêm vào giỏ <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-10 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-5 overflow-y-scroll">
          {data &&
            data?.reviews?.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    {/* <Ratings rating={data?.ratings} /> */}
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data?.reviews?.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;