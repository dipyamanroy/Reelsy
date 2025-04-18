"use client"
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Clapperboard, HomeIcon, Search, Sparkle, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: HomeIcon
    },
    {
        title: 'Create',
        url: '/create',
        icon: Clapperboard
    },
    {
        title: 'Explore',
        url: '/explore',
        icon: Search
    },
    {
        title: 'Billing',
        url: '/billing',
        icon: WalletCards
    }
]

function AppSidebar() {
    const path = usePathname();
    const { user } = useAuthContext();

    return (
        <Sidebar>
            <SidebarHeader >
                <div>
                    <div className='flex items-center gap-2 w-full justify-center mt-3'>
                        <Image src={'/logo.svg'} alt='Reelsy logo' width={50} height={50} />
                        <h2 className='font-bold text-2xl'>Reelsy</h2>
                    </div>
                    <h2 className='text-sm text-gray-400 text-center mt-3'>AI short form content generator</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className='mx-5 mt-4'>
                            <Link href={'/create'}>
                                <Button className='w-full'><Clapperboard />Create</Button>
                            </Link>
                        </div>
                        <SidebarMenu>
                            {MenuItems.map((menu, index) => (
                                <SidebarMenuItem key={index} className='mt-3 mx-5'>
                                    <Link href={menu?.url} className='block'>
                                        <SidebarMenuButton isActive={path==menu.url} className='p-5 w-full'>
                                            <div className='flex items-center gap-4 p-3'>
                                                <menu.icon />
                                                <span>{menu?.title}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <div className='p-5 border rounded-lg mb-6 bg-gray-800'>
                    <div className='flex items-center justify-between'>
                        <Sparkle className='text-gray-400' />
                        <h2 className='text-gray-400'>{user?.credits} Credits Left</h2>
                    </div>
                    <Button className='w-full mt-3'>Buy More Credits</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar