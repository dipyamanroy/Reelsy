"use client"
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useAuthContext } from '../provider'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function DashboardProvider({ children }) {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/');
        }
    }, [user, loading, router]);

    if (loading || (!user && typeof window !== 'undefined')) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-neutral-500" />
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full'>
                <AppHeader />
                <div className='p-8'>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}

export default DashboardProvider;