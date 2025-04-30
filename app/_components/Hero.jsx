"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../provider';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

function Hero() {
    const { user, loading } = useAuthContext();

    return (
        <section className="relative z-10 px-4 py-16 sm:py-24 flex flex-col items-center text-center gap-6 sm:gap-8 md:px-20 lg:px-36 xl:px-48">
            <h1 className="mt-24 font-regular text-4xl sm:text-5xl md:text-6xl leading-tight">
                Welcome to <span className="font-bold text-gradient bg-gradient-to-br from-green-600 to-blue-500 bg-clip-text text-transparent">Reelsy</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 max-w-3xl">
                Blazing fast AI short-form content generator that crafts engaging, tailored video scripts and ideas for your business in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {loading ? (
                    <Loader2 className="animate-spin text-neutral-700 m-2" />
                ) : !user ? (
                    <Authentication>
                        <Button size="lg">Get Started</Button>
                    </Authentication>
                ) : (
                    <>
                        <Button asChild size="lg">
                            <Link href="/dashboard">Go to dashboard</Link>
                        </Button>
                    </>
                )}
                <Link href="mailto:someemailaddress@5b.com">
                    <Button size="lg" variant="secondary">Contact Us</Button>
                </Link>
            </div>
        </section>
    )
}

export default Hero;
