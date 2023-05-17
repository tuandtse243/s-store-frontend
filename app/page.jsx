"use client"

import Header from "@/src/component/Header/Header";
import Footer from "@/src/component/Footer/Footer";
import Welcome from "@/src/component/Welcome/Welcome";
import Categories from "@/src/component/Categories/Categories";
import BestDeals from "@/src/component/BestDeals/BestDeals";
import FeaturedProduct from "@/src/component/FeatureProduct/FeatureProduct";
import Sponsored from "@/src/component/Sponsored/Sponsored";

import { useAuth, useIsAuthenticated } from '@/store/auth'
import { useEffect } from 'react'
import { server } from '@/server'
import axios from 'axios'
import { notification } from "antd";

const Home = () => {
  const setAuth = useAuth((state) => state.setAuth)
  const setIsAuthenticated = useIsAuthenticated((state) => state.setIsAuthenticated)

  useEffect(() => {
    axios.get(`${server}/user/getuser`,{withCredentials: true}).then((res) => {
      if(res.data.success) {
    setAuth(res.data.user)
    setIsAuthenticated(true)
  }
    }).catch((err) => {
      console.log(err)
      notification.error({message: err.response.data.message})
    })
  }, [])

  return (
    <div className="">
      <Header activeHeading={1}/>
      <Welcome />
      <Categories />
      <BestDeals />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  )
}

export default Home
