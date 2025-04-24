"use client"
import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../_components/RemotionPlayer'
import VideoInfo from '../_components/VideoInfo'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'

function PlayVideo() {
    const { videoId } = useParams();
    const convex = useConvex();
    const [videoData, setVideoData] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    const preloadAssets = async (video) => {
        const imagePreload = video?.images?.length ? preloadImages(video.images) : Promise.resolve();
        const audioPreload = video?.audioUrl ? preloadAudio(video.audioUrl) : Promise.resolve();
        try {
            await Promise.all([imagePreload, audioPreload]);
            setIsReady(true);
        } catch (err) {
            console.error("Error preloading assets:", err);
            setIsReady(true);
        }
    }

    const preloadImages = (images) => {
        return Promise.all(images.map(src =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            })
        ));
    };

    const preloadAudio = (audioUrl) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = audioUrl;
            audio.preload = 'auto';
            audio.addEventListener('canplaythrough', resolve);
            audio.addEventListener('error', reject);
        });
    };

    const fetchVideoData = async () => {
        const result = await convex.query(api.videoData.GetVideoById, { videoId });
        setVideoData(result); // render VideoInfo immediately
        preloadAssets(result); // wait for media only before player
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mr-30 ml-30'>
            <div>
                {!isReady ? (
                    <div
                        className="flex justify-center items-center bg-neutral-900 rounded-xl gap-3"
                        style={{ width: '25vw', height: '70vh' }}
                    >
                        <Loader2 className='animate-spin' />
                        <p className="text-neutral-400">Preparing video</p>
                    </div>
                ) : (
                    <RemotionPlayer videoData={videoData} />
                )}
            </div>
            <div>
                {videoData && (
                    <VideoInfo videoData={videoData} />
                )}
            </div>
        </div>
    )
}

export default PlayVideo
