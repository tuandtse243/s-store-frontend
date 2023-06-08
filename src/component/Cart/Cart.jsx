'use client'
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "@/src/styles/styles";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { notification } from "antd";
import { useAuth, useIsAuthenticated } from "@/store/auth";

const Cart = ({ setOpenCart }) => {
  const cart = useCart((state) => state.cart);
  const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        { cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
               <RxCross1 
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
                />
            </div>
            <h5>Giỏ hàng trống!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">{cart && cart.length} Sản phẩm</h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart && cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                    />
                ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link href={isAuthenticated ? "/checkout" : "/login"}>
              {/* <Link href="/checkout"> */}
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Thanh toán ({totalPrice} VNĐ)
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const setCart = useCart((state) => state.setCart);
  const cart = useCart((state) => state.cart);

  const totalPrice = data.discountPrice * data.qty;

  const increment = (data) => {
    if (data.stock < data.qty) {
      notification.error({message: `Số lượng hàng trong kho là ${data.stock}`});
    } else {
      const newCart = cart.map((item) => {
        if(item.name === data.name) {
          item.qty = data.qty + 1;
          return item;
        } else {
          return item;
        }
      })
      setCart(newCart)
    }
  };

  const decrement = (data) => {
    const newCart = cart.map((item) => {
      if(item.name === data.name) {
        item.qty = data.qty === 1 ? 1 : data.qty - 1;
        return item;
      } else {
        return item;
      }
    })
    setCart(newCart)
  };

  const removeFromCartHandler = (data) => {
    const newCart = cart.filter((item) => item.name !== data.name);
    setCart(newCart)
  }

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        
        <img
          src={data?.images[0]}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px] w-[100%]">
          <h1>{data.name}</h1>
          <h2>Size: {data?.size}</h2>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {data.discountPrice} VNĐ
          </h4>
          <div className="flex">
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                {totalPrice} VNĐ
            </h4>
            <div className="flex ml-5">
                <div
                className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                onClick={() => decrement(data)}
                >
                    <HiOutlineMinus size={16} color="#7d879c" />
                </div>
                <span className="px-[10px]">{data.qty}</span>
                <div
                className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                onClick={() => increment(data)}
                >
                    <HiPlus size={18} color="#fff" />
                </div>
            </div>
          </div>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;