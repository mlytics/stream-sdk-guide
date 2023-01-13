# Quick Start | Integrate SDK to HLS.js via browser

1. Install `hls.js`, `mux`.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.1.5"></script>
  <script src="https://src.litix.io/core/4/mux.js"></script>
  ```

2. Install `driver`.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@mlytics/p2sp-sdk@0.8.0/bundle/driver.min.js"></script>
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

4. Call `hls.js` like you normally would and include loader options with our loader.

  ```javascript
  const src = 'PLAYLIST_URL';

  const video = document.getElementById('video');
  let hls = new Hls({
    loader: driver.integrations.HLSLoader
  });
  hls.loadSource(src);
  hls.attachMedia(video);
  ```

5. Call `mux.monitor()` and include Mux data options.

  ```javascript
  mux.monitor(video, { // here is your 'MUX_DATA_OPTIONS' from mlytics portal
    data: {
      env_key: '...',
      sub_property_id: '...',
      view_session_id: '...',
      viewer_user_id: driver.info.sessionID,
      custom_1: '...'
    }
  });
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

[Full example](./index.html)