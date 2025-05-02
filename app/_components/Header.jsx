"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../provider'
import Link from 'next/link'
import { Loader2, LogOut, Menu, X } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { handleSignOut } from '../utils/authHelper'
import AuthModal from './AuthModal'

function Header() {
    const { user, loading } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300 ${
            scrolled || menuOpen ? 'bg-neutral-950/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href='/'>
                        <div className="flex items-center gap-3">
                            <Image src="/logo.svg" alt="logo" width={40} height={40} />
                            <h2 className="text-xl md:text-2xl font-bold">Reelsy</h2>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-10">
                        <Link href="#features" className="text-white hover:text-neutral-300">Features</Link>
                        <Link href="#pricing" className="text-white hover:text-neutral-300">Pricing</Link>
                        <Link href="#contact" className="text-white hover:text-neutral-300">Contact</Link>

                        {loading ? (
                            <Loader2 className="animate-spin text-neutral-700 m-2" />

                        ) : !user ? (
                            <AuthModal>
                                <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-gray-900 hover:bg-gradient-to-b transition duration-300">Get Started</Button>
                            </AuthModal>
                        ) : (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="default">Dashboard</Button>
                                </Link>
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
                    <div className="sm:hidden mt-4 flex flex-col gap-4 bg-neutral/90 p-4 rounded-lg shadow-md">
                        <Link href="#home" className="text-white hover:text-neutral-500">Home</Link>
                        <Link href="#features" className="text-white hover:text-neutral-500">Features</Link>
                        <Link href="#about" className="text-white hover:text-neutral-500">About</Link>
                        <Link href="#contact" className="text-white hover:text-neutral-500">Contact</Link>

                        {loading ? (
                            <Loader2 className="animate-spin text-neutral-700 m-2" />
                        ) : !user ? (
                            <AuthModal>
                                <Button className="w-full bg-gradient-to-br from-green-400 to-blue-500 text-gray-900 hover:bg-gradient-to-b transition duration-300">Get Started</Button>
                            </AuthModal>
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
            </div>
        </header>
    );
}

export default Header;
