'use client';
import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

// import { backend_url } from "../../../server";
import styles from "@/src/styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { addTocart } from "../../../redux/actions/cart";
// import Ratings from "../../Products/Ratings";
import Link from "next/link";
import { notification } from "antd";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data, isEvent }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

  const d = data.name;
  const product_name = d.replace(/\s+/g, '-');

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    // const isItemExists = cart && cart.find((i) => i._id === id);
    // if (isItemExists) {
    //   notification.error("Item already in cart!");
    // } else {
    //   if (data.stock < 1) {
    //     notification.error("Product stock limited!");
    //   } else {
    //     const cartData = { ...data, qty: 1 };
    //     dispatch(addTocart(cartData));
    //     notification.success("Item added to cart successfully!");
    //   }
    // }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative ">
        <div className="flex justify-end"></div>
        {/* <Link href={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link href={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link href={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link> */}

        <Link href={`/product/${product_name}`}>
            <img src={data.image_Url[0].url} alt="" 
                className="w-full h-[170px] object-contain"
            />
        </Link>
        <Link href='/'>
            <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link href={`/product/${product_name}`}>
            <h4 className="pb-3 font-[500]">
                {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
            </h4>
            <div className="flex">
                <AiFillStar className="mr-2 cursor-pointer" size={20} color="F6BA00"/>
                <AiFillStar className="mr-2 cursor-pointer" size={20} color="F6BA00"/>
                <AiFillStar className="mr-2 cursor-pointer" size={20} color="F6BA00"/>
                <AiFillStar className="mr-2 cursor-pointer" size={20} color="F6BA00"/>
                <AiFillStar className="mr-2 cursor-pointer" size={20} color="F6BA00"/>
            </div>

            <div className="py-2 flex items-center justify-between">
                <div className="flex">
                    <h5 className={`${styles.productDiscountPrice}`}>
                        {data.price === 0 ? data.price : data.discount_price}
                        đ
                    </h5>
                    <h4 className={`${styles.price}`}>
                        {data.price ? data.price + ' đ' : null}
                    </h4>
                </div>

                <span className="font-[400] text-[17px] text-[#68d284]">
                    {data.total_sell} sold
                </span>
            </div>
        </Link>
        {/* side options */}
        <div>
            {click ? (
                <AiFillHeart
                    size={22}
                    className="cursor-pointer absolute right-2 top-5"
                    onClick={() => setClick(!click)}
                    color={click ? "red" : "#333"}
                    title="Remove from wishlist"
                />): (
                <AiOutlineHeart
                    size={22}
                    className="cursor-pointer absolute right-2 top-5"
                    onClick={() => setClick(!click)}
                    color={click ? "red" : "#333"}
                    title="Remove from wishlist"
                />
                )
            }
            <AiOutlineEye
                size={22}
                className="cursor-pointer absolute right-2 top-14"
                onClick={() => setOpen(!open)}
                color="#333"
                title="Quick view"
            />
            <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer absolute right-2 top-24"
                onClick={() => addToCartHandler(data._id)}
                color="#444"
                title="Add to cart"
            />
            {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

        {/* side options */}
        {/* <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div> */}
      </div>
    </>
  );
};

export default ProductCard;