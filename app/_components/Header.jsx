"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

function Header() {
    const { user } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add scroll event listener to detect when the page is scrolled
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
        <header className={`fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
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
                        <Link href="#features" className="text-white hover:text-green-400">Features</Link>
                        <Link href="#pricing" className="text-white hover:text-green-400">Pricing</Link>
                        <Link href="#contact" className="text-white hover:text-green-400">Contact</Link>

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
                    <div className="sm:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
                        <Link href="#home" className="text-gray-700 hover:text-green-500">Home</Link>
                        <Link href="#features" className="text-gray-700 hover:text-green-500">Features</Link>
                        <Link href="#about" className="text-gray-700 hover:text-green-500">About</Link>
                        <Link href="#contact" className="text-gray-700 hover:text-green-500">Contact</Link>

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
            </div>
        </header>
    );
}

export default Header;
