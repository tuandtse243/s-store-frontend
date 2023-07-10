"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from '@/src/styles/styles';
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import DropDown from '../DropDown/DropDown';
import Navbar from '../Navbar/Navbar';
import { useIsAuthenticated, useAuth } from '@/store/auth';
import Cart from '../Cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { useCart } from '@/store/cart';


const Header = ({ activeHeading }) => {
    const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);
    const auth = useAuth((state) => state.auth);
    const cart = useCart((state) => state.cart);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      // setSearchTerm('');
      // window.addEventListener("scroll", () => {
      //   if (window.scrollY > 70) {
      //     setActive(true);
      //   } else {
      //     setActive(false);
      //   }
      // });
    }, [])

    const handleSearchChange = (e) => {
      const term = e?.target?.value;
      
      if(term === '') {
        setSearchData(null);
        setSearchTerm('');
        return;
      }
      
  
      const filteredProducts =
        productData &&
        productData.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );

      setSearchTerm(term);
      setSearchData(filteredProducts);
    };

    

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link href="/">
              <img src='https://res.cloudinary.com/ddlsrqvw9/image/upload/v1684334832/Artboard_1_ze0lzi.png' alt="" height={100} width={170}/>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link href={'#'}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link href={ isAuthenticated ? '/best-selling' : '/register'}>
              <h1 className="text-[#fff] flex items-center">
                {
                  isAuthenticated ? 'Săn sale' : 'Đăng ký ngay'
                }
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? `shadow-sm fixed top-0 left-0 z-10` : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#6e68a0] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                Các thương hiệu
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {/* {wishlist && wishlist.length} */}
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                { isAuthenticated ? (
                  <Link href="/profile">
                    <img
                      src={auth?.avatar}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link href="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null }
          w-full h-[80px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link href="/">
              <img src='https://res.cloudinary.com/ddlsrqvw9/image/upload/v1684334832/Artboard_1_ze0lzi.png' alt="" height={100} width={100} className="cursor-pointer"/>
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {/* {cart && cart.length} */}
                10
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {/* {wishlist && wishlist.length} */}
                      10
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link href={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link href="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link href="/profile">
                      {/* <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      /> */}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header