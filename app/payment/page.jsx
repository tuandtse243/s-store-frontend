import React from 'react'
import CheckoutSteps from '@/src/component/Checkout/CheckoutSteps';
import Footer from '@/src/component/Footer/Footer';
import Header from '@/src/component/Header/Header';
import Payment from '@/src/component/Payment/Payment';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage