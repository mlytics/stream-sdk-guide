# Quick Start | Integrate SDK to HLS.js via vue

1. Install `hls.js`, `mux`.

  ```bash
  npm install hls.js mux-embed
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

4. Call `hls.js` like you normally would and include loader options with our loader.

  ```javascript
  <template>
    <video id="video" ref="videoRef" style="width: 100%; maxwidth: 500px" />
  </template>

  <script>
  import Hls from 'hls.js';
  import mux from 'mux-embed';

  import { driver } from '@mlytics/p2sp-sdk/driver';
  import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

  export default {
    name: 'Player',
    data() {
      return {
        hls: null,
      };
    },
    mounted() {
      const src = 'PLAYLIST_URL';

      const video = this.$refs.videoRef;
      if (Hls.isSupported() && !this.hls) {
        this.hls = new Hls({
          loader: HLSLoader,
        });
        this.hls.loadSource(src);
        this.hls.attachMedia(video);
      }
    },
    beforeUnmount() {
      if (this.hls) this.hls.destroy();
    },
  };
  </script>
  ```

5. Call `mux.monitor()` and include Mux data options. Be sure to pass in the hlsjs instance and the Hls constructor.

  ```javascript
  mounted() {
    ...
    if (Hls.isSupported() && !this.hls) {
      ...
      mux.monitor(video, { // here is your 'MUX_DATA_OPTIONS' from mlytics portal
        hlsjs: hls,
        Hls: Hls,
        data: {
          env_key: '...',
          sub_property_id: '...',
          view_session_id: '...',
          viewer_user_id: driver.info.sessionID,
          custom_1: '...'
        }
      });
    }
  },
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
