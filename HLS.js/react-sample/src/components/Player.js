import { useEffect, useRef } from 'react';

import Hls from 'hls.js';
import mux from 'mux-embed';

import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

const Player = (props) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const hls = hlsRef.current;
    return () => {
      if (hls) {
        hls.destroyed();
      }
    }
  }, []);

  useEffect(() => {
    const { source } = props.options;
    const { src } = source;

    const video = videoRef.current;
    let hls = hlsRef.current;
    if (Hls.isSupported() && !hls) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      hlsRef.current = new Hls({
        loader: HLSLoader
      });
      hls = hlsRef.current;
      hls.loadSource(src);
      hls.attachMedia(video);

      mux.monitor(video, {
        Hls: Hls,
        hlsjs: hls,
        ...props.options.mux
      });
    }

  }, [videoRef]);

  const { controls, autoplay } = props.options;
  return (
    <video
      controls={controls}
      autoPlay={autoplay}
      ref={videoRef}
      style={{ width: "100%", maxWidth: "800px" }} />
  );
}
export default Player;
