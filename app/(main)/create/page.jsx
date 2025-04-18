"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import ArtStyle from './_components/ArtStyle';
import Voice from './_components/Voice';
import { ScrollArea } from '@/components/ui/scroll-area';

function Create() {
    const [ formData, setFormData ] = useState();

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev =>({
            ...prev,
            [fieldName]:fieldValue
        }))
        console.log(formData)
    }

    return (
        <div>
            <h2 className='text-3xl'>Create</h2>
            <h2 className='text-md text-gray-400'>Start your creative journey here</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-8'>
                <div className='col-span-2 p-7 border rounded-xl h-[70vh]'>
                <ScrollArea className='h-[500px] w-full'>
                    {/* Topic and Script */}
                    <Topic onHandleInputChange={onHandleInputChange} />
                    {/* Art style */}
                    <ArtStyle onHandleInputChange={onHandleInputChange} />
                    {/* Voice */}
                    <Voice onHandleInputChange={onHandleInputChange} />

                    {/* Captions */}
                </ScrollArea>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default Create