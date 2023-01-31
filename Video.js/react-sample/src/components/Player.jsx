import { useEffect, useRef } from 'react';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Player = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options } = props;

    useEffect(() => {
        const video = videoRef.current;
        if (!playerRef.current) {
            playerRef.current = videojs(video, options);
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return <div data-vjs-player>
        <video ref={videoRef} className="video-js" style={{ width: "100%", maxWidth: "800px" }} />
    </div>;
}
export default Player;
