import { useEffect, useRef } from 'react';

import DPlayer from 'dplayer';
import Hls from 'hls.js';
import mux from 'mux-embed';

import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

const Player = (props) => {
  const videoRef = useRef(null);
  const dpRef = useRef(null);

  useEffect(() => {
    const { source, autoplay, controls } = props.options;
    const { src } = source;

    const video = videoRef.current;
    dpRef.current = new DPlayer({
      container: video,
      autoplay,
      controls,
      video: {
        url: src,
        type: 'customHls',
        customType: {
          customHls: (video) => {
            const hls = new Hls({
              loader: HLSLoader
            });
            hls.loadSource(video.src);
            hls.attachMedia(video);

            mux.monitor(video, {
              Hls: Hls,
              hlsjs: hls,
              ...props.options.mux
            });
          }
        }
      }
    });

  }, [videoRef]);

  useEffect(() => {
    const dp = dpRef.current;
    return () => {
      if (dp) dp.destroy();
    }
  }, [dpRef]);

  return (
    <div id="video" ref={videoRef} style={{width: "100%", maxWidth: "800px"}}/>
  );
}
export default Player;
