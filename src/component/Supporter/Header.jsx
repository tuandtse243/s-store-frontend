import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "@/server";
import Link from "next/link";

const SupporterHeader = () => {
//   const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link href="/supporter">
            <img src='https://res.cloudinary.com/ddlsrqvw9/image/upload/v1684334832/Artboard_1_ze0lzi.png' alt="" height={100} width={150}/>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link href="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href="/supporter/events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href="/supporter/products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href="/supporter/orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link href="/supporter/messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href='/supporter'>
          {/* <Link href={`/supporter/${supporter._id}`}> */}
            <img
            //   src={`${backend_url}${seller.avatar}`}
              src={`${backend_url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupporterHeader;