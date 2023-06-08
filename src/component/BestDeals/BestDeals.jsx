import React, { useEffect, useState } from "react";
import styles from "@/src/styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { productData } from "@/src/static/data";
import axios from "axios";
import { server } from "@/server";

const BestDeals = () => {
  const [data, setData] = useState([]);
//   const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    // const allProductsData = allProducts ? [...allProducts] : [];
    // const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    // const firstFive = sortedData && sortedData.slice(0, 5);
    // setData(firstFive);
    const d = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = d.slice(0, 5);
    setData(firstFive)

//   }, [allProducts]);
  }, []);

  useEffect(() => {
    axios.get(`${server}/product/get-all-products`)
    .then((res) => setData(res.data.products.slice(0, 5)));
  }, [])
  

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Hot Deal</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;