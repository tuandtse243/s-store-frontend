'use client'
import CheckoutSteps from '@/src/component/Checkout/CheckoutSteps'
import Footer from '@/src/component/Footer/Footer'
import Header from '@/src/component/Header/Header'
import OrderSuccess from '@/src/component/OrderSuccess/OrderSuccess'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import OrderFail from '@/src/component/OrderFail/OrderFail'
import axios from 'axios'
import { server } from '@/server'

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const resultCode = searchParams.get('resultCode');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');
  console.log(orderId, resultCode, message)

  const order = JSON.parse(localStorage.getItem("latestOrder"));

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if(message === 'Thành công.') {
    order.paymentInfo = {
      id: orderId,
      status: 'PAID',
      type: "Momo",
      paidAt: Date.now(),
    };
  } else {
    order.paymentInfo = {
      id: orderId,
      status: 'FAIL',
      type: "Momo",
    };
  }

  useEffect(() => {
    console.log(order);
    
    axios.post(`${server}/order/update-order`, order, config);
  }, [])

  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={3} />
        {
          message === 'Thành công.' ? <OrderSuccess /> : <OrderFail />
        }
        <Footer />
    </div>
  )
}

export default OrderSuccessPage