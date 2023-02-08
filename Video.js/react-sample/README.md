# Quick Start | Integrate SDK to Videojs via react

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
    import { VideojsHlsSourcePlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

    import { useEffect } from 'react';

    import Player from './components/Player';

    const App = () => {
      useEffect(() => {
        driver.initialize();
      }, []);

      return (
        <><Player /></>
      );
    };

    export default App;
    ```

6. Call `video.js` like you normally would.

    ```javascript
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';
    import { useEffect, useRef } from 'react';

    const Player = () => {
      const videoRef = useRef(null);
      const playerRef = useRef(null);

      useEffect(() => {
        const src = 'PLAYLIST_URL';

        const video = videoRef.current;
        if (!playerRef.current) {
          playerRef.current = videojs(video, {
            autoplay: true,
            controls: true,
            sources: [{ src: src, type: 'application/vnd.apple.mpegurl' }]
          });
        }
      }, [videoRef]);

      useEffect(() => {
        const player = playerRef.current;
        return () => {
          if (player && !player.isDisposed()) {
            player.dispose();
            playerRef.current = null;
          }
        };
      }, [playerRef]);

      return <div data-vjs-player>
        <video ref={videoRef} className="video-js" style={{ width: "100%", maxWidth: "500px" }} />
      </div>;
    };

    export default Player;
    ```

7. Call` driver.extensions.VideojsHlsPlugin.adapt()` after player is ready.

    ```javascript
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';
    import { useEffect, useRef } from 'react';

    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

    const Player = () => {
      const videoRef = useRef(null);
      const playerRef = useRef(null);

      useEffect(() => {
        const src = '{PLAYLIST_URL}';

        const video = videoRef.current;
        if (!playerRef.current) {
          playerRef.current = videojs(video, {
            ...
          });
          driver.extensions.VideojsHlsPlugin.adapt(playerRef.current);
        }
      }, [videoRef]);

      ...

    export default Player;
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
