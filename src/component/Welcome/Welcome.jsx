import React from "react";
import styles from "@/src/styles/styles";
import Link from "next/link";

const Welcome = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/ddlsrqvw9/image/upload/v1686159427/dc77b0fcb593893ea683db142cc28004_vb4tpi.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: '100%',
        height: '100%',
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[80%] text-right`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[600] capitalize`}
        >
          Choose S-Store <br /> Choose Your Style
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[600] text-[#ffffffba]">
        Bạn muốn sở hữu một đôi giày thật độc đáo và phản ánh phong cách cá nhân? S-Store chính là nơi bạn cần đến! <br /> Với chức năng custom giày độc đáo, S-Store cho phép bạn tự tay trang trí và thay đổi màu sắc đôi giày theo cách mình thích.{" "}
          <br />
        </p>
        <Link href="/products" className="inline-block">
            <div className={`${styles.button} mt-5 bg-white`}>
                 <span className="text-[#000] font-[Poppins] text-[18px]">
                    Mua ngay
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;