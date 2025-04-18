import Image from 'next/image'
import React, { useState } from 'react'

export const options = [
    {
        name: 'Realistic',
        image: '/realistic.png'
    },
    {
        name: 'Cinematic',
        image: '/cinematic.png'
    },
    {
        name: 'Watercolor',
        image: '/watercolor.png'
    },
    {
        name: 'Cartoon',
        image: '/cartoon.png'
    },
    {
        name: 'Video game',
        image: '/video-game.png'
    },
    {
        name: 'Anime',
        image: '/anime.png'
    },
    {
        name: 'Fantasy',
        image: '/fantasy.png'
    },
]

function ArtStyle({ onHandleInputChange }) {
    const [selectedStyle, setSelectedStyle] = useState();

    return (
        <div className='mt-6'>
            <h2>Art Styles</h2>
            <p className='text-sm text-gray-400 mb-1'>Select the art style for your video</p>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
                {options?.map((option, index) => (
                    <div key={index} className='relative group overflow-hidden' 
                        onClick={() => {setSelectedStyle(option.name)
                            onHandleInputChange('artStyle', option.name)
                        }}>
                        <Image
                            src={option.image}
                            alt={option.name}
                            width={500}
                            height={120}
                            className={`object-cover h-[90px] md:h-[120px] lg:h-[150px] xl:h-[180px] p-1 hover:border rounded-lg border-gray-300 cursor-pointer
                                ${option.name == selectedStyle && 'border'}`}
                        />

                        {/* Gradient overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

                        {/* Text over image */}
                        <h2 className='absolute bottom-2 text-center w-full text-sm text-white z-20 font-medium pointer-events-none'>
                            {option.name}
                        </h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ArtStyle