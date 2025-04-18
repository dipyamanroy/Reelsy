import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react'

const voiceOptions = [
    {
        "value": "alloy",
        "name": "🇺🇸 Alloy (Female)"
    },
    {
        "value": "ash",
        "name": "🇺🇸 Ash (Male)"
    },
    {
        "value": "ballad",
        "name": "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Ballad (Male)"
    },
    {
        "value": "coral",
        "name": "🇺🇸 Coral (Female)"
    },
    {
        "value": "echo",
        "name": "🇺🇸 Echo (Male)"
    },
    {
        "value": "fable",
        "name": "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Fable (Male)"
    },
    {
        "value": "onyx",
        "name": "🇺🇸 Onyx (Male)"
    },
    {
        "value": "nova",
        "name": "🇺🇸 Nova (Feale)"
    },
    {
        "value": "sage",
        "name": "🇺🇸 Sage (Female)"
    },
    {
        "value": "shimmer",
        "name": "🇺🇸 Shimmer (Female)"
    },
    {
        "value": "verse",
        "name": "🇺🇸 Verse (Male)"
    },
]

function Voice({ onHandleInputChange }) {
    const [selectedVoice, setSelectedVoice] = useState();

    return (
        <div className='mt-6'>
            <h2>Voices</h2>
            <p className='text-sm text-gray-400 mb-1'>Pick the voice for your video</p>
            <ScrollArea className='h-[150px] w-full'>
            <div className='grid grid-cols-2 gap-3'>
                {voiceOptions.map((voice, index) => (
                    <h2 className={`cursor-pointer p-3 dark:bg-gray-900 dark:border-white rounded-lg hover:border ${voice.name == selectedVoice && 'border'}`}
                    key={index}
                    onClick={() => {setSelectedVoice(voice.name)
                        onHandleInputChange('voice', voice.value)
                    }}>
                        {voice.name}
                    </h2>
                ))}
            </div>
            </ScrollArea>
        </div>
    )
}

export default Voice