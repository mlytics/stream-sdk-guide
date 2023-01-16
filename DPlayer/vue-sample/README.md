# Quick Start | Integrate SDK to DPlayer.js via vue

1. Install `DPlayer`, `mux`.

  ```bash
  npm install dplayer mux-embed
  ```

2. Install `driver`.

  ```bash
  npm install @mlytics/p2sp-sdk@0.8.0
  ```

3. When page is loading, call `driver.initialize()` first.

  ```javascript
  <template>
    <Player/>
  </template>

  <script>
  import { driver } from '@mlytics/p2sp-sdk/driver';

  import Player from './components/Player.vue';

  export default {
    name: 'App',
    components: {
      Player
    },
    setup() {
      driver.initialize({
        client: { // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics portal
          id: 'CLIENT_ID',
          key: 'CLIENT_KEY'
        }
      });
    }
  };
  </script>
  ```

4. Call `DPlayer` like you normally would and include loader options with our loader.

  ```javascript
  <template>
    <div id="video" ref="videoRef" />
  </template>

  <script>
  import DPlayer from 'dplayer';
  import Hls from 'hls.js';
  import mux from 'mux-embed';

  import { driver } from '@mlytics/p2sp-sdk/driver';
  import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

  export default {
    name: 'Player',
    data() {
      return {
        dp: null,
      };
    },
    mounted() {
      const src = 'PLAYLIST_URL';

      const video = this.$refs.videoRef;
      this.dp = new DPlayer({
        container: video,
        autoplay: true,
        video: {
          url: src,
          type: 'customHls',
          customType: {
            customHls: (video) => {
              const hls = new Hls({
                loader: HLSLoader,
              });
              hls.loadSource(video.src);
              hls.attachMedia(video);
            }
          }
        }
      });
    },
    beforeUnmount() {
      if (this.dp) {
        this.dp.destroy();
      }
    }
  };
  </script>
  ```

5. Wait until the video DOM object, created by `DPlayer`, is finished, and then call `mux.monitor()` including Mux data options.

  ```javascript
  mounted() {
    ...
    this.dp.on('loadstart', () => {
      mux.monitor(this.dp.video, { // here is your 'MUX_DATA_OPTIONS' from mlytics portal
        data: {
          env_key: '...',
          sub_property_id: '...',
          view_session_id: '...',
          viewer_user_id: driver.info.sessionID,
          custom_1: '...'
        }
      });
    });
  }
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
