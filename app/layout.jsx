"use client"

import '../styles/globals.scss'

import { useEffect } from 'react'
import axios from 'axios'
import { notification } from "antd";
import { useRouter } from 'next/navigation'
import { useAuth, useIsAuthenticated } from '@/store/auth'
import { server } from '@/server';

export default function RootLayout({ children }) {
  const router = useRouter();
  // router.refresh();
  const setAuth = useAuth((state) => state.setAuth)
  const auth = useAuth((state) => state.auth)
  const setIsAuthenticated = useIsAuthenticated((state) => state.setIsAuthenticated)
  

  useEffect(() => {
    const authCookie = localStorage.getItem('token');
    if(authCookie && !auth) {
      axios.get(`${server}/user/getuser`,{withCredentials: true}).then((res) => {
        if(res.data.success) {
          setAuth(res.data.user)
          setIsAuthenticated(true)
        }
      }).catch((err) => {
        console.log(err)
        notification.error({message: err.response?.data?.message})
      })
    }
  }, [])

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
