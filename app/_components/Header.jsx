"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

function Header() {
    const { user } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="py-6 relative z-10">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Image src="/logo.svg" alt="logo" width={40} height={40} />
                    <h2 className="text-xl md:text-2xl font-bold">Reelsy</h2>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-4">
                    {!user ? (
                        <Authentication>
                            <Button>Get Started</Button>
                        </Authentication>
                    ) : (
                        <>
                            <Link href="/dashboard">
                                <Button variant="default">Dashboard</Button>
                            </Link>
                            <Image
                                src={user?.photoURL}
                                alt="User"
                                width={36}
                                height={36}
                                className="rounded-full object-cover"
                            />
                        </>
                    )}
                </div>

                {/* Hamburger Icon */}
                <button
                    className="sm:hidden"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="sm:hidden mt-4 flex flex-col gap-4">
                    {!user ? (
                        <Authentication>
                            <Button className="w-full">Get Started</Button>
                        </Authentication>
                    ) : (
                        <>
                            <Link href="/dashboard">
                                <Button className="w-full">Dashboard</Button>
                            </Link>
                            <div className="flex items-center gap-3 mt-2">
                                <Image
                                    src={user?.photoURL}
                                    alt="User"
                                    width={36}
                                    height={36}
                                    className="rounded-full object-cover"
                                />
                                <span className="text-sm text-gray-700">Welcome back!</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}

export default Header;
