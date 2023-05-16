'use client'
import server from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Activation = ({ params }) => {
  const activation_token = params.activation_token
  const [error, setError] = useState(false);

  useEffect(() => {
    if(activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message)
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