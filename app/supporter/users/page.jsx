import React from 'react'

import SupporterHeader from '@/src/component/Supporter/Header';
import SupporterSideBar from '@/src/component/Supporter/Sidebar';
import AllUsers from '@/src/component/Supporter/AllUsers';

const ShopAllUsers = () => {
  return (
    <div>
        <SupporterHeader />
        <div className="flex items-top justify-stretch w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <SupporterSideBar active={5} />
            </div>
            <AllUsers />
          </div>
    </div>
  )
}

export default ShopAllUsers