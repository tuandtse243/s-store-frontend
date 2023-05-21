import CheckoutSteps from '@/src/component/Checkout/CheckoutSteps'
import Footer from '@/src/component/Footer/Footer'
import Header from '@/src/component/Header/Header'
import OrderSuccess from '@/src/component/OrderSuccess/OrderSuccess'
import React from 'react'

const OrderSuccessPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={3} />
        <OrderSuccess />
        <Footer />
    </div>
  )
}

export default OrderSuccessPage