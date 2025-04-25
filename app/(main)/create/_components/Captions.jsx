import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"

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
    {
        name: 'None',
        style: 'opacity-0'
    },
]
function Captions({ onHandleInputChange }) {
    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState(null);
    const [noCaption, setNoCaption] = useState(false);

    const handleNoCaptionToggle = (checked) => {
        setNoCaption(checked);

        if (checked) {
            setSelectedCaptionStyle('None');
            const noneOption = options.find(opt => opt.name === 'None');
            onHandleInputChange('caption', noneOption);
        } else {
            setSelectedCaptionStyle(null);
            onHandleInputChange('caption', null);
        }
    }

    return (
        <div className='mt-6'>
            <h2 className='text-lg font-semibold'>Caption Styles</h2>
            <p className='text-sm text-gray-400 mb-2'>Select caption style for your video</p>

            {/* No Captions toggle */}
            <div className='flex items-center gap-2 mb-4'>
                <Checkbox
                    id="noCaptions"
                    checked={noCaption}
                    onCheckedChange={handleNoCaptionToggle}
                />
                <label htmlFor="noCaptions" className="text-md">No Captions</label>
            </div>

            {/* Caption styles */}
            <div className='flex flex-wrap gap-4 mt-2'>
                {options.filter(opt => opt.name !== 'None').map((option, index) => (
                    <div
                        key={index}
                        className={`p-2 dark:bg-gray-900 dark:border-white rounded-lg hover:border cursor-pointer ${selectedCaptionStyle === option.name && 'border'} ${noCaption ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => {
                            if (noCaption) return;

                            setSelectedCaptionStyle(option.name);
                            onHandleInputChange('caption', option);
                        }}
                    >
                        <h2 className={option.style}>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Captions;