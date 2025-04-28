"use client"
import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { Clapperboard, RotateCw } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function VideoList() {
    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const convex = useConvex();
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) GetUserVideoList();
    }, [user]);

    const GetUserVideoList = async () => {
        setLoading(true);
        try {
            const result = await convex.query(api.videoData.GetUserVideos, {
                uid: user?._id
            });

            setVideoList(result || []);

            const isPendingVideo = result?.find((item) => item.status === 'pending');
            if (isPendingVideo) GetPendingVideoStatus(isPendingVideo);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false); // Always set loading to false regardless of result
        }
    };

    const GetPendingVideoStatus = (pendingVideo) => {
        const intervalId = setInterval(async () => {
            const result = await convex.query(api.videoData.GetVideoById, {
                videoId: pendingVideo?._id
            });

            if (result?.status === 'completed') {
                clearInterval(intervalId);
                GetUserVideoList();
            }
        }, 5000);
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-60">
                <RotateCw className="animate-spin text-neutral-400" size={32} />
            </div>
        );
    }

    return (
        <div>
            {videoList.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16 bg-neutral-900'>
                    <Image src={'/logo.svg'} style={{ filter: 'grayscale(100%)' }} alt='logo' width={50} height={50} />
                    <h2 className='text-gray-400 text-lg'>You don't have any videos. Click create to make your first!</h2>
                    <Link href={'/create'}><Button variant='secondary' className='mt-2'><Clapperboard />Create</Button></Link>
                </div>
            ) : (
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10'>
                    {videoList.map((video, index) => (
                        video?.status === 'completed' ? (
                            <Link key={index} href={'/play-video/' + video?._id}>
                                <div className='relative'>
                                    <Image
                                        src={video?.images[0]}
                                        alt={video?.title}
                                        width={500}
                                        height={500}
                                        className='w-full object-cover rounded-xl aspect-[2/3]'
                                    />
                                    <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl"></div>
                                    <div className='absolute bottom-3 px-5 w-full z-10'>
                                        <h2 className="text-white font-semibold">{video?.title}</h2>
                                        <h2 className='text-sm text-gray-300'>{moment(video?._creationTime).fromNow()}</h2>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div key={index} className='relative'>
                                <div className='aspect-[2/3] p-5 w-full rounded-xl bg-neutral-900 flex flex-col items-center justify-center gap-2'>
                                    <RotateCw className='animate-spin text-neutral-400' />
                                    <h2 className='text-sm text-neutral-400'>Generating...</h2>
                                </div>
                                <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl"></div>
                                <div className='absolute bottom-3 px-5 w-full z-10'>
                                    <h2 className="text-white font-semibold">{video?.title}</h2>
                                    <h2 className='text-sm text-gray-300'>{moment(video?._creationTime).fromNow()}</h2>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default VideoList;