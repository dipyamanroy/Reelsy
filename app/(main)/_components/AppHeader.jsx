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
                        <Image
                            src={user?.photoURL}
                            alt="User"
                            width={36}
                            height={36}
                            className="rounded-full object-cover cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-3 py-2">
                            <p className="font-medium leading-none">{user?.name || "User"}</p>
                            <p className="mt-1 truncate text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : null}
        </div>
    )
}

export default AppHeader