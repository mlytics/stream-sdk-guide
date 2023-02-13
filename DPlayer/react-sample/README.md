---
title: react
category: 63d9d34969da0c007a7219be
slug: dplayer-react
---
# Quick Start | Integrate SDK to DPlayer.js via react

## Install SDK

Install the bundled packages.

```bash
npm install @mlytics/p2sp-sdk@latest
npm install mux-embed
```



## Install DPlayer

Install the latest DPlayer package.

```bash
npm install dplayer
```



## Initialize SDK

To initialize SDK, we need to pass **`<driver><client><id>`** and **`<driver><client><key>`** attributes while calling intialize(). When page is loading, call driver.initialize() first. Here's an example showing how you could initialize SDK with JavaScript.

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

## Configure HLS loader

In order to use SDK to download the video, we need to specify DPlayer uses SDK loader. Call DPlayer like you normally would and include loader options with our loader. Here's an example showing how you could configure HLS loader with JavaScript.

```javascript
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import mux from 'mux-embed';
import { useEffect, useRef } from 'react';

import { driver } from '@mlytics/p2sp-sdk/driver';
import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

const Player = () => {
  const videoRef = useRef(null);
  const dpRef = useRef(null);

  useEffect(() => {
    const src = 'PLAYLIST_URL';

    const video = videoRef.current;
    dpRef.current = new DPlayer({
      container: video,
      autoplay: true,
      video: {
        url: src,
        type: 'customHls',
        customType: {
          customHls: (video) => {
            const hls = new Hls({
              loader: HLSLoader
            });
            hls.loadSource(video.src);
            hls.attachMedia(video);
          }
        }
      }
    });
  }, [videoRef]);

  useEffect(() => {
    const dp = dpRef.current;

    return () => {
      if (dp) {
        dp.destroy();
        dpRef.current = null;
      }
    }
  }, [dpRef]);

  return (
    <div id="video" ref={videoRef} />
  );
};

export default Player;
```

## Configure video monitor

In order to monitor the video experience, we need to pass **`<player><plugins><mux><data><env_key>`**, **`<player><plugins><mux><data><sub_property_id>`**, **`<player><plugins><mux><data><view_session_id>`** and **`<player><plugins><mux><data><custom_1>`** while calling DPlayer. Wait until the video DOM object, created by DPlayer, is finished, and then call mux.monitor() including SDK attributes. Here's an example showing how you could configure a video monitor with JavaScript.

```javascript
new DPlayer({
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

Now start the service and view the request log in your browser. You should be able to find domains with .m3u8 and .ts extension from one of the CDN domains configured in the stream settings.

# Full example

See [react demo](https://github.com/mlytics/stream-sdk-guide/tree/main/DPlayer/react-sample)