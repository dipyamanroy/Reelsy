import React, { useState } from 'react'

const options = [
    {
        name: 'Youtuber',
        style: 'text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg'
    },
    {
        name: 'Supreme',
        style: 'text-red-400 text-3xl font-bold italic drop-shadow-lg px-3 py-1 rounded-lg'
    },
    {
        name: 'Glitch',
        style: 'text-pink-500 text-3xl font-extrabold tracking-wide uppercase drop-shadow-lg px-3 py-1 rounded-lg'
    },
    {
        name: 'Minimal',
        style: 'text-black text-3xl dark:text-white text-xl font-light tracking-normal px-3 py-1'
    },
    {
        name: 'Elegant',
        style: 'text-gray-800 dark:text-gray-200 text-3xl font-serif italic px-3 py-1'
    },
    {
        name: 'Neon',
        style: 'text-lime-400 text-3xl font-extrabold uppercase tracking-tight drop-shadow-[0_0_5px_rgba(124,252,0,0.6)] px-3 py-1'
    },
    {
        name: 'Fire',
        style: 'text-orange-500 text-3xl font-bold uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,69,0,0.7)] px-3 py-1'
    },
    {
        name: 'Futuristic',
        style: 'text-blue-500 text-3xl font-light uppercase tracking-wide drop-shadow-[0_0_15px_rgba(0, 204, 255, 0.8), 0_0_25px_rgba(0, 204, 255, 0.6)] px-3 py-1'
    },
]


function Captions({ onHandleInputChange }) {
    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState();

    return (
        <div className='mt-6'>
            <h2>Captions</h2>
            <p className='text-sm text-gray-400 mb-1'>Select caption style for your video</p>
            <div className='flex flex-wrap gap-4 mt-2'>
                {options.map((option, index) => (
                    <div key={index} className={`p-2 dark:bg-gray-900 dark:border-white rounded-lg hover:border cursor-pointer ${selectedCaptionStyle == option.name && 'border'}`}
                        onClick={() => {
                            setSelectedCaptionStyle(option.name)
                            onHandleInputChange(option)
                        }}
                    >
                        <h2 className={option.style}>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Captions