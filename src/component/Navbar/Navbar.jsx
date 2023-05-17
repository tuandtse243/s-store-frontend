import React from 'react'
import { navItems } from '../../static/data'
import styles from '@/src/styles/styles'
import Link from 'next/link'

const Navbar = ({active}) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex" key={index}>
                    <Link href={i.url}
                    className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar