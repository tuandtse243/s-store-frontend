import SupporterHeader from '@/src/component/Supporter/Header'
import SupporterSideBar from '@/src/component/Supporter/Sidebar'
import SupporterWelcome from '@/src/component/Supporter/SupporterWelcome'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <SupporterHeader />
        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <SupporterSideBar active={1} />
            </div>
        <SupporterWelcome />
        </div>
    </div>
  )
}

export default Dashboard