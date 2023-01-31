# Quick Start | Integrate SDK to HLS.js via react

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
  import { driver } from '@mlytics/p2sp-sdk/driver';
  import { useEffect } from 'react';

  import Player from './components/Player';

  const App = () => {
    useEffect(() => {
      driver.initialize({
        client: {  // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics portal
          id: 'CLIENT_ID',
          key: 'CLIENT_KEY',
        }
      });
    }, []);

    return (
      <><Player /></>
    );
  };

  export default App;
  ```

4. Call `hls.js` like you normally would and include loader options with our loader.

  ```javascript
  import Hls from 'hls.js';
  import mux from 'mux-embed';
  import { useEffect, useRef } from 'react';

  import { driver } from '@mlytics/p2sp-sdk/driver';
  import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

  const Player = () => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);

    useEffect(() => {
      const hls = hlsRef.current;
      return () => {
        if (hls) {
          hls.destroyed();
        }
      }
    }, []);

    useEffect(() => {
      const src = 'PLAYLIST_URL';

      const video = videoRef.current;
      let hls = hlsRef.current;
      if (Hls.isSupported() && !hls) {
        hlsRef.current = new Hls({
          loader: HLSLoader
        });
        hls = hlsRef.current;
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    }, [videoRef]);

    return (
      <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} />
    );
  };

  export default Player;
  ```

5. Call `mux.monitor()` and include Mux data options. Be sure to pass in the hlsjs instance and the Hls constructor.

  ```javascript
  useEffect(() => {
    ...
    if (Hls.isSupported() && !hls) {
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
  }, [videoRef]);
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
