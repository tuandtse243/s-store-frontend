'use client'
import React, { useEffect, useState } from "react";
import Header from "@/src/component/Header/Header";
import styles from "@/src/styles/styles";
import ProfileSidebar from "@/src/component/ProfileSidebar/ProfileSidebar";
import ProfileContent from "@/src/component/ProfileContent/ProfileContent";
import { useIsAuthenticated } from "@/store/auth";
import { useRouter } from "next/navigation";
// import Loader from "../components/Layout/Loader";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const isAuthenticated = useIsAuthenticated((state) => state.setIsAuthenticated)
  const router = useRouter();

  if(!isAuthenticated) {
    router.push('/login')
  }

  return (
    <div className="pb-10">
      {false ? (
        {/* <Loader /> */}
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;