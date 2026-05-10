'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const { logout, token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Axios Interceptor for 401 errors
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    console.warn('Auth session expired or invalid. Logging out...');
                    logout();
                    router.push('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, [logout, router]);

    return <>{children}</>;
}
