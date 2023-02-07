# Quick Start | Integrate SDK to Videojs via vue

1. Install `video.js`.

    ```bash
    npm install video.js
    ```

2. Install `driver`.

    ```bash
    npm install @mlytics/p2sp-sdk
    ```

3. In `index.html`, append config script file to the tail part of `<head>` tag.

    ```html
    <header>
      ...
      <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
    </header>
    ```

4. To make `video.js` use HLS, call `VideojsHlsSourcePlugin.register()` from SDK module.

    ```javascript
    import videojs from 'video.js';
    
    import { VideojsHlsSourcePlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

    VideojsHlsSourcePlugin.register(videojs);
    ```

5. When page is loading, call `driver.initialize()` first.

    ```javascript
    <template>
      <Player/>
    </template>

    <script>
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

    import Player from './components/Player.vue';

    export default {
      name: 'App',
      components: {
        Player
      },
      setup() {
        driver.initialize();
      }
    };
    </script>
    ```

6. Call `video.js` like you normally would.

    ```javascript
    <template>
      <div>
          <video ref="video" class="video-js" style="width: 100%; maxWidth: 500px"></video>
      </div>
    </template>

    <script>
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';

    export default {
      name: 'Player',
      data() {
        return {
          player: null
        }
      },
      mounted() {
        const src = '{PLAYLIST_URL}';

        const video = this.$refs.video;
        this.player = videojs(video, {
          autoplay: true,
          controls: true,
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

7. Call` driver.extensions.VideojsHlsPlugin.adapt()` after player is ready.

    ```javascript
    <script>
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';

    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

    export default {
      ...
      mounted() {
        const src = '{PLAYLIST_URL}';

        const video = this.$refs.video;
        this.player = videojs(video, {
          ...
        });
        driver.extensions.VideojsHlsPlugin.adapt(this.player);
      },
      ...
    }
    </script>
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
