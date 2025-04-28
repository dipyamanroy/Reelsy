import React from 'react';
import { Composition } from 'remotion';
import RemotionComposition from './../app/_components/RemotionComposition';

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