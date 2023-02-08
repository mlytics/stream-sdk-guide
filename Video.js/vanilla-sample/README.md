---
title: html
category: 63d9d34969da0c007a7219be
slug: video-js-html
---
# Integrate player

## Install SDK

Include the pre-build bundled scripts.

```html
<!-- Configuration might be different along with Stream. -->
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/videojs-hls.min.js"></script>
```



## Install Video.js

Include the latest Video.js script.

```html
<script src="https://vjs.fusioncdn.com/7.18.0/video.min.js"></script>
```



## Initialize SDK Driver

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize();
```



## Configure SDK Adapter

In order to use SDK to download the video, we need to configure the VideoJS Adapter by passing your VideoJS instance. Call `driver.extensions.VideojsHlsPlugin.adapt()` after player is ready. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
const src = '{PLAYLIST_URL}';

const video = document.getElementById('video');
const player = videojs(video, {
  autoplay: true,
  controls: true,
  sources: [{ src: src, type: 'application/vnd.apple.mpegurl' }]
});

// To configure the VideoJS Adapter by passing your VideoJS instance
driver.extensions.VideojsHlsPlugin.adapt(player);
```


Now start the service and view the request log in your browser. You should be able to find domains with .m3u8 and .ts extension from one of the CDN domains configured in the stream settings.


# Full example

See [HTML demo](https://github.com/mlytics/stream-sdk-guide/tree/main/Video.js/vanilla-sample)