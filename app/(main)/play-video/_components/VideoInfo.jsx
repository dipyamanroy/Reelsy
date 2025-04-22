"use client";
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function VideoInfo({ videoData }) {
    const [isPending, setIsPending] = useState(true);
    const downloadUrl = videoData?.downloadUrl;

    useEffect(() => {
        // Poll every 15 seconds to check if the download URL is available
        const intervalId = setInterval(() => {
            if (downloadUrl) {
                setIsPending(false);
                clearInterval(intervalId);
            }
        }, 15000);

        return () => clearInterval(intervalId); 
    }, [downloadUrl]);

    return (
        <div className='p-5 border rounded-xl'>
            <Link href={'/dashboard'}>
                <Button variant='outline'>
                    <h2 className='flex gap-2 items-center text-xs'>
                        <ChevronLeft />
                        Back to Dashboard
                    </h2>
                </Button>
            </Link>
            <div className='flex flex-col gap-3'>
                <h2 className='mt-5 font-bold'>{videoData?.title}</h2>
                <p className='text-neutral-500 text-sm'>{videoData?.script}</p>
                <div className='flex flex-col justify-between gap-2'>
                    <Button variant='secondary' disabled>{videoData?.artStyle}</Button>

                    {isPending ? (
                        <Button variant="secondary" disabled>
                            <Loader2 className="animate-spin w-4 h-4" />
                            Processing...
                        </Button>
                    ) : (
                        <Link href={downloadUrl}>
                            <Button className='w-full'>
                                <Download />
                                Export and Download
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoInfo;
