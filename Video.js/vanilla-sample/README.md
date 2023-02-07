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


Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.


# Full example

See [HTML demo](https://github.com/mlytics/stream-sdk-guide/tree/main/Video.js/vanilla-sample)