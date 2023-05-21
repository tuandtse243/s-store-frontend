'use client'
import styles from '@/src/styles/styles';
import React from 'react'
import {useRouter} from 'next/navigation'

const OrderFail = () => {

    const router = useRouter();
    return (
        <div>
          <br />
          <br />
          <br />
          {/* <Lottie options={defaultOptions} width={300} height={300} /> */}
          <h5 className="text-center mb-5 text-[25px] text-[#000000a1]">
            Xảy ra lỗi trong quá trình thanh toán 😭
          </h5>
          <div className='flex justify-center'>
            <input
                type="button"
                value="Quay về trang chủ"
                className={`${styles.button} !bg-[#978643] text-[#fff] h-[45px] rounded-[3px] cursor-pointer text-[14px] font-[600] hover:brightness-130`}
                onClick={() => router.push('/')}
            />
          </div>
          <br />
          <br />
        </div>
    );
}

export default OrderFail