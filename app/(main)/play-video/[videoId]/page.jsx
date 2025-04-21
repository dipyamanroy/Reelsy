import React from 'react'
import RemotionPlayer from '../_components/RemotionPlayer'
import VideoInfo from '../_components/VideoInfo'

function PlayVideo() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
                {/* Remotion player */}
                <RemotionPlayer />
            </div>
            <div>
                {/* Video information */}
                <VideoInfo />
            </div>
        </div>
    )
}

export default PlayVideo