'use client'
import { useEffect } from 'react';
import Login from '../../src/component/Login/Login';
import { useAuth, useIsAuthenticated } from '@/store/auth';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const isAuthenticated = useIsAuthenticated((state) => state.isAuthenticated);

    const router = useRouter();
    useEffect(() => {
        if(isAuthenticated) {
            router.push('/')
        }
    }, [])

    return (
        <div className='w-full h-screen bg-gray-100'>
            <Login />
        </div>
    )
}
export default LoginPage