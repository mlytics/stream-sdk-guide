<template>
  <video id="video" ref="videoRef" style="width: 100%; maxWidth: 500px" :controls="options.controls"
    :autoplay="options.autoplay" />
</template>

<script>
import Hls from 'hls.js'
import mux from 'mux-embed';

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
      hls: null
    };
  },
  async mounted() {
    const { hlsConfig, source } = this.options;
    const { src } = source;

    const video = this.$refs.videoRef;
    if (video) {
      if (Hls.isSupported() && !this.hls) {
        this.hls = new Hls({
          loader: hlsConfig.loader
        });
        this.hls.loadSource(src);
        this.hls.attachMedia(video);

        if (this.options.mux) {
          mux.monitor(video, this.options.mux);
        }
      }
    }
  },
  async beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
};
</script>
