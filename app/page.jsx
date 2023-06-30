"use client"

import Header from "@/src/component/Header/Header";
import Footer from "@/src/component/Footer/Footer";
import Welcome from "@/src/component/Welcome/Welcome";
import Categories from "@/src/component/Categories/Categories";
import BestDeals from "@/src/component/BestDeals/BestDeals";
import FeaturedProduct from "@/src/component/FeatureProduct/FeatureProduct";


const Home = () => {

  return (
    <div className="">
      <Header activeHeading={1}/>
      <Welcome />
      <Categories />
      <BestDeals />
      <FeaturedProduct />
      <Footer />
    </div>
  )
}

export default Home
