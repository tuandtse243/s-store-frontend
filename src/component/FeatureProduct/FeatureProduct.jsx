'use client'
import React, { useEffect, useState } from "react";
import styles from "@/src/styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { productData } from "@/src/static/data";
import axios from "axios";
import { server } from "@/server";

const FeaturedProduct = () => {
    const allProducts = productData;
    const [products, setProducts] = useState([])

    useEffect(() => {
      axios.get(`${server}/product/get-all-products`)
      .then((res) => setProducts(res.data.products));
    }, [])

    // console.log(products);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            products && products.length !== 0 &&(
                <>
                {products && products?.map((i, index) => <ProductCard data={i} key={index} />)}
                </>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;