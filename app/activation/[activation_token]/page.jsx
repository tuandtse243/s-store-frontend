'use client'
import server from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAuthenticated, useAuth } from '@/store/auth';

const Activation = ({ params }) => {
  const router = useRouter();
  const activation_token = params.activation_token
  const [error, setError] = useState(false);
  const setIsAuthenticated = useIsAuthenticated((state) => state.setIsAuthenticated)
  const setAuth = ((state) => state.setAuth)

  useEffect(() => {
    if(activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message)
          setIsAuthenticated(true)
          setAuth(res.user)
          router.push('/')
        } catch (error) {
          console.log(error.response.data.message);
          setError(true)         
        };
      };
      activationEmail();
    }
  }, [activation_token])

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  )
}

export default Activation