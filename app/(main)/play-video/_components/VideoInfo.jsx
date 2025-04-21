import { Button } from '@/components/ui/button'
import { ChevronLeft, Download } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function VideoInfo({ videoData }) {
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
                    <Button><Download/>Export and Download</Button>
                </div>
            </div>
        </div>
    )
}

export default VideoInfo