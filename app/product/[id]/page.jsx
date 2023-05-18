'use client'
import Header from '@/src/component/Header/Header'
import Footer from '@/src/component/Footer/Footer'
import ProductDetails from '@/src/component/ProductDetails/ProductDetails'
import React, { useEffect, useState } from "react";
import { productData } from '@/src/static/data';
import SuggestedProduct from '@/src/component/SuggestedProduct/SuggestedProduct';

const ProductDetailsPage = ({ params }) => {
    const id = params?.id;
    console.log(id)
    // const { allProducts } = useSelector((state) => state.products);
    // const { allEvents } = useSelector((state) => state.events);
    // const { id } = useParams();
    const [data, setData] = useState(null);
    // const [searchParams] = useSearchParams();
    // const eventData = searchParams.get("isEvent");

    // useEffect(() => {
    //     if (eventData !== null) {
    //     const data = allEvents && allEvents.find((i) => i._id === id);
    //     setData(data);
    //     } else {
    //     const data = allProducts && allProducts.find((i) => i._id === id);
    //     setData(data);
    //     }
    // }, [allProducts, allEvents]);

    const productName = id.replace(/-/g, " ");
    console.log(productName)

    useEffect(() => {
        const data = productData.find((i) => i.name === productName);
        setData(data)
    }, [])

  return (
    <div>
        <Header />
        <ProductDetails data={data}/>
        {/* {
          !eventData && (
            <>
            {data && <SuggestedProduct data={data} />}
            </>
          )
        } */}
        <SuggestedProduct data={data} />
        <Footer />
    </div>
  )
}

export default ProductDetailsPage