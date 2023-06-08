'use client'
import Header from '@/src/component/Header/Header'
import Footer from '@/src/component/Footer/Footer'
import ProductDetails from '@/src/component/ProductDetails/ProductDetails'
import React, { useEffect, useState } from "react";
import { productData } from '@/src/static/data';
import SuggestedProduct from '@/src/component/SuggestedProduct/SuggestedProduct';
import axios from 'axios';
import { server } from '@/server';

const ProductDetailsPage = ({ params }) => {
    const id = params?.id;
    const [data, setData] = useState(null);

    // const productName = id.replace(/-/g, " ");

    useEffect(() => {
      axios.get(`${server}/product/get-product-by-id`, {
        params: {id: id},
      }).then((res) => setData(res.data.product))
    }, [])

    // console.log(data)

  return (
    <div>
        <Header />
        <ProductDetails data={data}/>
        {/* <SuggestedProduct data={data} /> */}
        <Footer />
    </div>
  )
}

export default ProductDetailsPage