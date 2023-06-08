'use client';

import React, { useEffect, useState } from "react";
import Footer from "@/src/component/Footer/Footer";
import Header from "@/src/component/Header/Header";
// import Loader
import ProductCard from "@/src/component/ProductCard/ProductCard";
import styles from "@/src/styles/styles";
import { productData } from "@/src/static/data";
import { useAuth, useIsAuthenticated } from "@/store/auth";
import axios from "axios";
import { server } from "@/server";


const ProductsPage = () => {
  const [data, setData] = useState(productData);

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
            <Header activeHeading={3} />
            <br />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                </div>
                {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                    No products Found!
                </h1>
                ) : null}
            </div>
            <Footer />
        </div>
        )
    }
  </div>
  );
};

export default ProductsPage;