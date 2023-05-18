'use client'

import { useIsAuthenticated } from '@/store/auth';
import Register from '../../src/component/Register/Register'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { notification } from 'antd';

const RegisterPage = () => {
    const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);

    const router = useRouter();
    useEffect(() => {
        if(isAuthenticated) {
            notification.error({message: 'You have already logged!'})
            router.push('/')
        }
    }, [])

    return (
        <div>
            <Register />
        </div>
    )
}
export default RegisterPage