---
title: html
category: 63d9d34969da0c007a7219be
slug: hls-js-html
---
# Quick Start | Integrate SDK to HLS.js via browser

## Install SDK

Include the pre-build bundled scripts.

```html
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://mjs.fusioncdn.com/core/4/mux.js"></script>
```



## Install HLS.js

Include the latest HLS.js script.

```html
<script src="https://jsdelivr.fusioncdn.com/npm/hls.js@1.1.5"></script>
```



## Initialize SDK

To initialize SDK, we need to pass **`<driver><client><id>`** and **`<driver><client><key>`** attributes while calling intialize(). When page is loading, call driver.initialize(). Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize({
  client: { // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics portal
    id: 'CLIENT_ID',
    key: 'CLIENT_KEY'
  }
});
```



## Configure HLS loader

In order to use SDK to download the video, we need to specify HLS.js uses SDK loader. Call HLS.js like you normally would and include loader options with our loader. Here's an example showing how you could configure HLS loader with JavaScript.

```javascript
const src = 'PLAYLIST_URL';

const video = document.getElementById('video');
let hls = new Hls({
  loader: driver.integrations.HLSLoader
});
hls.loadSource(src);
hls.attachMedia(video);
```



## Configure video monitor

In order to monitor the video experience, we need to pass **`<player><plugins><mux><data><env_key>`**, **`<player><plugins><mux><data><sub_property_id>`**, **`<player><plugins><mux><data><view_session_id>`** and **`<player><plugins><mux><data><data.custom_1>`** while calling HLS.js. Add SDK attributes using HLS.js options. Here's an example showing how you could configure a video monitor with JavaScript.

```javascript
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
```

Now start the service and view the request log in your browser. You should be able to find domains with .m3u8 and .ts extension from one of the CDN domains configured in the stream settings.


# Full example

See [html demo](https://github.com/mlytics/stream-sdk-guide/tree/main/HLS.js/vanilla-sample)