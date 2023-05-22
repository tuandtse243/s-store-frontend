import React from 'react'

import CreateProduct from '@/src/component/Supporter/CreateProduct';
import SupporterHeader from '@/src/component/Supporter/Header';
import SupporterSideBar from '@/src/component/Supporter/Sidebar';
import AllOrders from '@/src/component/Supporter/AllOrders';

const SupporterCreateProduct = () => {
  return (
    <div>
        <SupporterHeader />
        <div className="flex items-top justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <SupporterSideBar active={2} />
            </div>
            <AllOrders />
          </div>
    </div>
  )
}

export default SupporterCreateProduct