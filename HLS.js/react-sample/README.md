---
title: react
category: 63d9d34969da0c007a7219be
slug: hls-js-react
---
# Quick Start | Integrate SDK to HLS.js via react

## Install SDK

Install the bundled packages.

```text
npm install @mlytics/p2sp-sdk@latest
npm install mux-embed
```



## Install HLS.js

Include the latest HLS.js packages.

```text
npm install hls.js
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

In order to use SDK to download the video, we need to specify HLS.js uses SDK loader. Call HLS.js like you normally would and include loader options with our loader. Here's an example showing how you could configure HLS loader with JavaScript.

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



## Configure video monitor

In order to monitor the video experience, we need to pass **`<player><plugins><mux><data><env_key>`**, **`<player><plugins><mux><data><sub_property_id>`**, **`<player><plugins><mux><data><view_session_id>`** and **`<player><plugins><mux><data><custom_1>`** while calling Video.js. Add SDK attributes using HLS.js options. Here's an example showing how you could configure a video monitor with JavaScript.

```javascript
useEffect(() => {
  ...
  if (Hls.isSupported() && !hls) {
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
}, [videoRef]);
```

Now start the service and view the request log in your browser. You should be able to find domains with .m3u8 and .ts extension from one of the CDN domains configured in the stream settings.

# Full example

See [react demo](https://github.com/mlytics/stream-sdk-guide/tree/main/HLS.js/react-sample)