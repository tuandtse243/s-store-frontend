import React from 'react'

import AllProducts from '@/src/component/Supporter/AllProducts';
import SupporterHeader from '@/src/component/Supporter/Header';
import SupporterSideBar from '@/src/component/Supporter/Sidebar';

const ShopAllProducts = () => {
  return (
    <div>
        <SupporterHeader />
        <div className="flex items-top justify-stretch w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <SupporterSideBar active={3} />
            </div>
            <AllProducts />
          </div>
    </div>
  )
}

export default ShopAllProducts