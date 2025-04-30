"use client"
import { useAuthContext } from '@/app/provider'
import { handleSignOut } from '@/app/utils/authHelper'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function AppHeader() {
    const { user } = useAuthContext();
    return (
        <div className='p-3 flex justify-between items-center'>
            <SidebarTrigger />
            {user?.photoURL ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="p-0.5 rounded-full hover:ring-2 hover:ring-neutral-700 transition duration-200">
                            <Image
                                src={user?.photoURL}
                                alt="User"
                                width={36}
                                height={36}
                                className="rounded-full object-cover cursor-pointer"
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mt-2">
                        <DropdownMenuItem onClick={handleSignOut} className="gap-2">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : null}
        </div>
    )
}

export default AppHeader