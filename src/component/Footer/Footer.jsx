import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#6e68a0] py-5">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Theo dõi</span> chúng tôi để nhận tin tức{" "}
          <br />
          sự kiện và ưu đãi
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Email của bạn..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Đăng ký
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm"
      >
        <img src='https://res.cloudinary.com/ddlsrqvw9/image/upload/v1684334832/Artboard_1_ze0lzi.png' alt="" height={80} width={170}/>
        <span className="flex items-center justify-center">© 2023 S-Store. All rights reserved.</span>
        {/* <span>Terms · Privacy Policy</span> */}

        <div className="flex items-center mt-[15px] justify-center">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        
      </div>
    </div>
  );
};

export default Footer;