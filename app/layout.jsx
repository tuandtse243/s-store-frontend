"use client"

import '../styles/globals.scss'
import { useAuth, useIsAuthenticated } from '@/store/auth'
import { useEffect } from 'react'
import { server } from '@/server'
import axios from 'axios'
import { notification } from "antd";
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }) {
  const router = useRouter();
  console.log('abc')
  // router.refresh();
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
      notification.error({message: err.response?.data?.message})
    })
  }, [])

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
