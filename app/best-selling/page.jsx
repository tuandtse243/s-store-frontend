'use client';

import Footer from '@/src/component/Footer/Footer'
import Header from '@/src/component/Header/Header'
import React, { useEffect, useState } from 'react'
import ProductCard from "@/src/component/ProductCard/ProductCard";
import styles from "@/src/styles/styles";
import { productData } from "@/src/static/data";
import axios from 'axios';
import { server } from '@/server';

const BestSellingPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${server}/product/get-all-products`)
        .then((res) => setData(res.data.products));
      }, [])
  return (
    <div>
        {
            false ? (
            {/* <Loader /> */}
            ) : (
            <div>
                <Header activeHeading={2} />
                <br />
                <br />
                <div className={`${styles.section}`}>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                    </div>
                </div>
                <Footer />
            </div>
            )
        }
    </div>
  )
}

export default BestSellingPage