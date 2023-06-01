import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

// import { backend_url } from "../../../server";
import styles from "@/src/styles/styles";
import { notification } from "antd";
import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart } from "../../../redux/actions/cart";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(false);

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[70vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.images?.[0]}
                  alt=""
                />
                {/* <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                /> */}
                <div className="flex">
                  <Link href={'#'} className="flex">
                    {/* <img
                      src={data.shop.shop_avatar.url}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    /> */}
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.category}
                      </h3>
                      <h5 className=" text-[15px]">(4.5) Ratings</h5>
                    </div>
                  </Link>
                </div>
                <h5 className="text-[16px] text-[red]">(50) Đã bán</h5>
              </div>

              <div className="w-full 800px:w-[50%] pl-[20px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}đ
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center justify-between pr-3">
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
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;