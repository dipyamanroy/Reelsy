import React from 'react'
import { Player } from "@remotion/player";

function RemotionPlayer() {
    return (
        <div>
            <Player
                component={MyVideo}
                durationInFrames={120}
                compositionWidth={720}
                compositionHeight={1280}
                fps={30}
            />
        </div>
    )
}

export default RemotionPlayer