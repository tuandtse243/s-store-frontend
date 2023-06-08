'use client'

import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "@/src/styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
//   const {allProducts} = useSelector((state) => state.products);
  const [realtedData, setRelatedData] = useState();
  // console.log(data)

  useEffect(() => {
    const d = productData && productData.filter((i) => i.category === data?.category);
    setRelatedData(d);
  }, [data]);
//   useEffect(() => {
//     const d =
//     allProducts && allProducts.filter((i) => i.category === data.category);
//     setProductData(d);
//   }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
                realtedData && realtedData.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;