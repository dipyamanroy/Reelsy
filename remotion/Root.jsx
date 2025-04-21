import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import RemotionComposition from './../app/_components/RemotionComposition';

const videoData = {
    audioUrl: "",
    captionJson: [
        {
            confidence: 0.9934575,
            end: 0.32,
            start: 0,
            word: "hey",
        },
        {
            confidence: 0.7858948,
            end: 0.79999995,
            start: 0.32,
            word: "there",
        },
        {
            confidence: 0.99844474,
            end: 1.12,
            start: 0.79999995,
            word: "ever",
        },
        {
            confidence: 0.99906653,
            end: 1.36,
            start: 1.12,
            word: "felt",
        },
        {
            confidence: 0.7987315,
            end: 1.68,
            start: 1.36,
            word: "lost",
        },
        {
            confidence: 0.996727,
            end: 2.32,
            start: 1.68,
            word: "navigating",
        },
    ],
    images: ['https://firebasestorage.googleapis.com/v0/b/fifth-bridge.firebasestorage.app/o/Reelsy-data%2Fimages%2Fimg-1745209082594-dp36b.png?alt=media&token=f61d31ba-1adc-4930-8f6e-2f84c86eb2ec']
}

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id="reelsy"
                component={RemotionComposition}
                durationInFrames={Number((videoData?.captionJson[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0))}
                fps={30}
                width={720}
                height={1280}
                defaultProps={{
                    videoData: videoData
                }}
            />
        </>
    );
};