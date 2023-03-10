# Quick Start | Integrate SDK to DPlayer.js via browser

1. Install `DPlayer`, `mux`.

  ```html
  <script src="https://jsdelivr.fusioncdn.com/npm/dplayer@1.26.0/dist/DPlayer.min.js"></script>
  <script src="https://mjs.fusioncdn.com/core/4/mux.js"></script>
  ```

2. Install `driver`.

  ```html
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@0.8.0/bundle/driver.min.js"></script>
  ```

3. Call `mlysdk.driver.initialize()` first.

  ```javascript
  const driver = mlysdk.driver.initialize({
    client: { // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics portal
      id: 'CLIENT_ID',
      key: 'CLIENT_KEY'
    }
  });
  ```

4. Call `DPlayer` like you normally would and include loader options with our loader.

  ```javascript
  const src = 'PLAYLIST_URL';

  const video = document.getElementById('video');
  const dp = new window.DPlayer({
    container: video,
    autoplay: true,
    video: {
      url: src,
      type: 'customHls',
      customType: {
        customHls: (video) => {
          const hls = new Hls({
            loader: driver.integrations.HLSLoader
          });
          hls.loadSource(video.src);
          hls.attachMedia(video);
        }
      }
    }
  });
  ```

5. Call `mux.monitor()` including Mux data options. Be sure to pass in the Hls constructor and its instance.

  ```javascript
  new window.DPlayer({
    ...
    customHls: (video) => {
      ...
      mux.monitor(video, { // here is your 'MUX_DATA_OPTIONS' from mlytics portal
        Hls: Hls,
        hlsjs: hls,
        data: {
          env_key: '...',
          sub_property_id: '...',
          view_session_id: '...',
          viewer_user_id: driver.info.sessionID,
          custom_1: '...'
        }
      });
    }
  });
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

[Full example](./index.html)
