'use client'
import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import Link from "next/link";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useAuth, useIsAuthenticated } from "@/store/auth";
import { useRouter } from "next/navigation";

const SupporterSideBar = ({ active }) => {
  const setAuth = useAuth((state) => state.setAuth);
  const setIsAuthenticated = useIsAuthenticated((state) => state.setIsAuthenticated);
  const router = useRouter()

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setAuth(null);
    setIsAuthenticated(false);
    router.push('/login');
  }

  return (
    <div className="w-full h-[100%] bg-white shadow-sm top-0 left-0 z-10 py-[30px]">
      <div className="w-full flex items-center p-4">
        <Link href="/supporter" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link href="/supporter/orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Quản lý đơn hàng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link href="/supporter/products" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Quản lý sản phẩm
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          href="/supporter/create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tạo sản phẩm
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          href="/supporter/users"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Quản lý người dùng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link href="/supporter/messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Hộp Chat
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link href="/supporter/coupouns" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Mã giảm giá
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link href="/supporter/refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Hoàn trả
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link href="/" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Chỉnh sửa tài khoản
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <div className="w-full flex items-center cursor-pointer" onClick={logoutHandler}>
          <CiSettings
            size={30}
            color={`${active === 10 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Đăng xuất
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SupporterSideBar;