import React from 'react'
import Header from '@/src/component/Header/Header';
import CheckoutSteps from '@/src/component/Checkout/CheckoutSteps';
import Checkout from '@/src/component/Checkout/Checkout';
import Footer from '@/src/component/Footer/Footer';

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage