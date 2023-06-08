'use client'
import CheckoutSteps from '@/src/component/Checkout/CheckoutSteps'
import Footer from '@/src/component/Footer/Footer'
import Header from '@/src/component/Header/Header'
import OrderSuccess from '@/src/component/OrderSuccess/OrderSuccess'
import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation';
import OrderFail from '@/src/component/OrderFail/OrderFail'
import axios from 'axios'
import { server } from '@/server'

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const typeOrder = searchParams.get('typeOrder');
  const resultCode = searchParams.get('resultCode');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');
  const token = useRef();
  let order = {};

  if (typeof window !== 'undefined') {
    order = JSON.parse(localStorage.getItem("latestOrder"));
    token.current = localStorage.getItem("token");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.current}`,
    },
  };

  if(message === 'Thành công.') {
    order.paymentInfo = {
      id: orderId,
      status: 'SUCCESS',
      type: "Momo",
      paidAt: Date.now(),
    };
    order.status = "PROCESSING"
  } else {
    order.paymentInfo = {
      id: orderId,
      status: 'FAIL',
      type: "Momo",
      paidAt: Date.now(),
    };
    order.status = "PAYMENT FAIL"
  }



  useEffect(() => {
    if(typeOrder === 'cashOnDelivery') return;
    axios.post(`${server}/order/update-order`, order, config);
  }, [])

  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={3} />
        {
          typeOrder === 'cashOnDelivery' || message === 'Thành công.' ? <OrderSuccess /> : <OrderFail />
        }
        <Footer />
    </div>
  )
}

export default OrderSuccessPage