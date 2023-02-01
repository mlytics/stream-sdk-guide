<template>
  <div id="video" ref="videoRef" style="width: 100%; maxWidth: 800px"/>
</template>

<script>
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import mux from 'mux-embed';

import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Player',
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      dp: null
    };
  },
  async mounted() {
    const { source, autoplay, controls } = this.options;
    const { src } = source;
    const video = this.$refs.videoRef;

    let type = 'normal';
    if (Hls.isSupported()) {
      type = 'customHls';
    } else {
      alert("hls is not supported.")
    }

    this.dp = new DPlayer({
      container: video,
      autoplay,
      controls,
      video: {
        url: src,
        type,
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
              ...this.options.mux
            });
          }
        }
      }
    });
  },
  async beforeUnmount() {
    if (this.dp) this.dp.destroy();
  }
};
</script>
