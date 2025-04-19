"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import ArtStyle from './_components/ArtStyle';
import Voice from './_components/Voice';
import { ScrollArea } from '@/components/ui/scroll-area';
import Captions from './_components/Captions';
import { Button } from '@/components/ui/button';
import { WandSparkles } from 'lucide-react';
import Preview from './_components/Preview';
import axios from 'axios';

function Create() {
    const [formData, setFormData] = useState();

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
        console.log(formData)
    }

    const GenerateVideo = async () => {
        if(!formData?.topic || !formData?.script || !formData?.artStyle || !formData?.caption || !formData?.voice) 
        {
            console.log("ERROR", "Enter All Fields")
        }
        const result = await axios.post('/api/generate-video-data', {
            ...formData
        })
        console.log(result);
    }

    return (
        <div>
            <h2 className='text-3xl'>Create</h2>
            <h2 className='text-md text-gray-400'>Start your creative journey here</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-10'>
                <div className='col-span-2 p-7 border rounded-xl h-[70vh]'>
                    <ScrollArea className='h-[500px] w-full'>
                        {/* Topic and Script */}
                        <Topic onHandleInputChange={onHandleInputChange} />
                        {/* Art style */}
                        <ArtStyle onHandleInputChange={onHandleInputChange} />
                        {/* Voice */}
                        <Voice onHandleInputChange={onHandleInputChange} />
                        {/* Captions */}
                        <Captions onHandleInputChange={onHandleInputChange} />
                    <Button
                        className='mt-5 w-full'
                        // className={`mt-3 transition-opacity duration-300 ${selectedScriptIndex != null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        size='sm'
                        onClick={GenerateVideo}
                        // disabled={isLoading}
                    >
                        {/* {isLoading ? (
                            <Loader2 className="animate-spin mr-1" size={16} />
                        ) : ( */}
                            <WandSparkles className="mr-1" size={16} />
                        {/* )} */}
                        Generate Video
                    </Button>
                    </ScrollArea>
                </div>
                <div>
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default Create