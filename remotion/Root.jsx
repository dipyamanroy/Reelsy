import React from 'react';
import { Composition } from 'remotion';
import RemotionComposition from './../app/_components/RemotionComposition';

export const RemotionRoot = () => {
    return (
        <Composition
            id="reelsy"
            component={RemotionComposition}
            width={720}
            height={1280}
            fps={30}
            defaultProps={{
                videoData: {
                    audioUrl: "",
                    captionJson: [],
                    images: [],
                    caption: {
                        name: "Default",
                        style: "text-white text-lg",
                    },
                },
                captionStyle: "text-white text-lg",
            }}
            calculateMetadata={async ({ props }) => {
                const captionJson = props.videoData?.captionJson ?? [];
                const lastCaption = captionJson[captionJson.length - 1];
                const durationInFrames = lastCaption?.end
                    ? Math.floor(lastCaption.end * 30)
                    : 30;

                const captionStyle = props.videoData?.caption?.style ?? "text-white text-lg";

                return {
                    durationInFrames,
                    props: {
                        ...props,
                        captionStyle,
                    },
                };
            }}
        />
    );
};