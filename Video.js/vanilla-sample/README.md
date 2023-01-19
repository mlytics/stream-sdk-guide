# Quick Start | Integrate SDK to Videojs via browser

1. Install `video.js`, `videojs-mux`.

  ```html
  <script src="https://vjs.fusioncdn.com/7.18.0/video.min.js"></script>
  <script src="https://mjs.fusioncdn.com/videojs/4/videojs-mux.js"></script>
  ```

2. Install `driver` and `videojs-hls` plugin.

  ```html
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@0.8.0/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@0.8.0/bundle/peripheral/videojs-hls.min.js"></script>
  ```

3. Call `mlysdk.driver.initialize()` first.

  ```javascript
  const driver = mlysdk.driver.initialize({
    client: { // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics live stream
      id: 'CLIENT_ID',
      key: 'CLIENT_KEY'
    }
  });
  ```

4. Call video.js like you normally would and include `html5.hlsConfig.loader` with our loader.

  ```javascript
  const src = 'PLAYLIST_URL';

  const video = document.getElementById('video');
  const player = videojs(video, {
    autoplay: true,
    controls: true,
    html5: {
      hlsConfig: {
        loader: driver.integrations.HLSLoader
      }
    },
    sources: [{ src: src, type: 'application/vnd.apple.mpegurl' }]
  });
  ```

5. Add `Mux plugin options` to the `video.js` options.

  ```javascript
  videojs(video, {
    ...
    plugins: {
      mux: { // here is your 'MUX_DATA_OPTIONS' from mlytics live stream
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

[Full example](./index.html)
