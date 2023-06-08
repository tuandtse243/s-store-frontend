'use client'
import styles from '@/src/styles/styles';
import React from 'react'
// import Lottie from 'react-lottie';
// import animationData from '../../../public/assets/107043-success.json'
import {useRouter} from 'next/navigation'

const OrderSuccess = () => {
    // const defaultOptions = {
    //   loop: true,
    //   autoplay: true,
    //   animationData: abc,
    //   rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    //   },
    // };
    const router = useRouter();
    return (
        <div>
          <br />
          <br />
          <br />
          {/* <Lottie options={defaultOptions} width={300} height={300} /> */}
          <h5 className="text-center mb-5 text-[25px] text-[#000000a1]">
            <h1 className='text-[#de1919a1] font-bold'>Đặt hàng thành công</h1>
            Cảm ơn bạn đã tin tưởng chúng tôi 😍
          </h5>
          <div className='flex justify-center'>
            <input
                type="button"
                value="Tiếp tục mua sắm"
                className={`${styles.button} !bg-[#978643] text-[#fff] h-[45px] rounded-[3px] cursor-pointer text-[14px] font-[600] hover:brightness-130`}
                onClick={() => router.push('/')}
            />
          </div>
          <br />
          <br />
        </div>
    );
}

export default OrderSuccess