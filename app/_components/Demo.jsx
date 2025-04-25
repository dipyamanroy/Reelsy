"use client"

import Image from 'next/image'
import React from 'react'

function Demo() {
    return (
        <section className="relative z-10 px-4 py-16 md:px-20 lg:px-36 xl:px-48 flex justify-center items-center">
            {/* Glowing Effect */}
            <div className="absolute w-4xl mb-30 h-full bg-gradient-to-br from-green-400 to-blue-500 opacity-30 blur-3xl rounded-xl z-0" />

            {/* Demo Image */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl z-10">
                <Image
                    src="/demo.png" // Replace with your actual image path
                    alt="Demo Image"
                    width={2000}  // Larger image
                    height={1500} // Larger image
                    className="w-full h-auto object-cover rounded-xl"
                />
            </div>
        </section>
    )
}

export default Demo;
