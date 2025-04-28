"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // Import the router
import Topic from './_components/Topic'
import ArtStyle from './_components/ArtStyle';
import Voice from './_components/Voice';
import { ScrollArea } from '@/components/ui/scroll-area';
import Captions from './_components/Captions';
import { Button } from '@/components/ui/button';
import { Loader2, WandSparkles } from 'lucide-react';
import Preview from './_components/Preview';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { useAuthContext } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { toast } from "sonner"

function Create() {
    const [formData, setFormData] = useState();
    const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Initialize the router

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const GenerateVideo = async () => {
        if (user?.credits <= 0) {
            toast("No Credits", {
                description: "You are all out of credits!"
            });
            return;
        }

        if (!formData?.topic || !formData?.script || !formData?.artStyle || !formData?.caption || !formData?.voice) {
            toast("Error", {
                description: "Please enter all required fields",
            })
            return;
        }

        setIsLoading(true);
        try {
            // Save Video data
            const resp = await CreateInitialVideoRecord({
                title: formData.title,
                topic: formData.topic,
                script: formData.script,
                artStyle: formData.artStyle,
                caption: formData.caption,
                voice: formData.voice,
                uid: user?._id,
                createdBy: user?.email,
                credits: user?.credits
            });

            const result = await axios.post('/api/generate-video-data', {
                ...formData,
                recordId: resp
            });

            router.push('/dashboard');
        } catch (error) {
            console.error('Error generating video:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div
            className="absolute w-60 h-60 bg-gradient-to-br from-green-400 via-blue-400 to-blue-500 rounded-full blur-2xl opacity-40 z-[-20] pointer-events-none animate-pulse shadow-[0_0_80px_30px_rgba(34,197,94,0.3)]"
            style={{ top: '-100px', right: '25px' }}
            />
            <h2 className='text-3xl'>Create</h2>
            <h2 className='text-md text-gray-400'>Start your creative journey here</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-10'>
            <ScrollArea className='col-span-2 h-[70vh] w-full'>
                <div className=' p-7 border rounded-xl h-[70vh]'>
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
                            size='sm'
                            onClick={GenerateVideo}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin mr-1" size={16} />
                            ) : (
                                <WandSparkles className="mr-1" size={16} />
                            )}
                            Generate Video
                        </Button>
                    </div>
                </ScrollArea>
                <div>
                    <Preview formData={formData} />
                </div>
            </div>
        </div>
    )
}

export default Create