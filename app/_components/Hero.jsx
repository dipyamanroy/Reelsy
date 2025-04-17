import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'

function Hero() {
    return (
        <div className='p-10 flex flex-col items-center justify-center mt-32 md:px-20 lg:px-36 xl:px-48'>
            <h2 className='font-bold text-5xl text-center'>Welcome to Reelsy</h2>
            <p className='mt-4 text-2xl text-gray-400 text-center'>Blazing fast AI short form content generator that creates engaging content tailored for your business</p>
            <div className='mt-7 flex gap-8'>
                <Authentication>
                    <Button size="lg">Get Started</Button>
                </Authentication>
                <Button size="lg" variant="secondary">Contact Us</Button>
            </div>
        </div>
    )
}

export default Hero