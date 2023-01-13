# Quick Start | Integrate SDK to Videojs via vue

1. Install `video.js`, `videojs-mux`.

  ```bash
  npm install video.js videojs-mux
  ```

2. Install `driver`.

  ```bash
  npm install @mlytics/p2sp-sdk@0.8.0
  ```

3. To make `video.js` use HLS, call `VideojsHlsPlugin.register()` from SDK module.

  ```javascript
  import videojs from 'video.js';
  import { VideojsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/plugin';

  VideojsHlsPlugin.register(videojs);
  ```

4. When page is loading, call `driver.initialize()` first.

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

5. Call `video.js` like you normally would and include `html5.hlsConfig.loader` with our loader.

  ```javascript
  <template>
    <div>
        <video ref="video" class="video-js" style="width: 100%; maxWidth: 500px"></video>
    </div>
  </template>

  <script>
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  import "videojs-mux";

  import { driver } from '@mlytics/p2sp-sdk/driver';
  import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

  export default {
    name: 'Player',
    data() {
      return {
        player: null
      }
    },
    mounted() {
      const src = 'PLAYLIST_URL';

      const video = this.$refs.video;
      this.player = videojs(video, {
        autoplay: true,
        controls: true,
        html5: {
          hlsConfig: {
            loader: HLSLoader
          }
        },
        sources: [{ src: src, type: 'application/vnd.apple.mpegurl' }]
      });
    },
    beforeUnmount() {
      if (this.player) {
        this.player.dispose();
      }
    }
  };
  </script>
  ```

6. Add `Mux plugin options` to the `video.js` options.

  ```javascript
  videojs(video, {
    ...
    plugins: {
      mux: { // here is your 'MUX_DATA_OPTIONS' from mlytics portal
        data: {
          env_key: '...',
          sub_property_id: '...',
          view_session_id: '...',
          viewer_user_id: driver.info.sessionID,
          custom_1: '...'
        }
      }
    }
  });
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
