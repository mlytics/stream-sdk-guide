<template>
  <Player :options="videoOptions"/>
</template>

<script>
import videojs from 'video.js';
import "videojs-mux";

import { driver } from '@mlytics/p2sp-sdk/driver';
import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';
import { VideojsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/plugin';
import Player from './components/Player.vue';

VideojsHlsPlugin.register(videojs);

export default {
  name: 'App',
  components: {
    Player
  },
  setup() {
    driver.initialize({
      client: {
        id: 'cehcdiphseaa0coe0c10',
        key: '3rFGoxUluezmM7ZyRj2NiQHsCpvJaDEY'
      }
    });
  },
  data() {
    return {
      videoOptions: {
          autoplay: true,
          controls: true,
          html5: {
            hlsConfig: {
              loader: HLSLoader
            }
          },
          playbackRates: [0.5, 0.75, 1.0, 1.5, 2.0],
          sources: [{
            src: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8',
            type: 'application/vnd.apple.mpegurl'
          }],
          plugins: {
            mux: {
              data: {
                env_key: "hmp0tvs823e2hovchm60o2m11",
                viewer_user_id: driver.info.sessionID,
                sub_property_id: "1001642588942",
                view_session_id: "cehcdiphseaa0coe0c00",
                custom_1: "cehcdiphseaa0coe0c10"
              }
            }
          }
        }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
