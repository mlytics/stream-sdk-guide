---
title: vue
category: 63d9d34969da0c007a7219be
slug: video-js-vue
---
# Quick Start | Integrate SDK to Videojs via vue

## Install SDK

Install the bundled packages.

```shell
npm install @mlytics/p2sp-sdk@latest
```



## Install Video.js

Install the latest Video.js package.

```shell
npm install video.js
```



## Include Config Script

In `index.html`, append config script file to the tail part of `<head>` tag.

```html public/index.html
<header>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</header>
```



## Bind HLS loader

Bind Video.js with our HLS loader plugin. To make Video.js use HLS, call VideojsHlsPlugin.register() from SDK module. Here's an example showing how you could bind HLS loader SDK with JavaScript.

```javascript
import videojs from 'video.js';

import { VideojsHlsSourcePlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

VideojsHlsSourcePlugin.register(videojs);
```



## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player/>
</template>

<script>
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    Player
  },
  setup() {
    driver.initialize();
  }
};
</script>
```



## Configure SDK Adapter

In order to use SDK to download the video, we need to configure the VideoJS Adapter by passing your VideoJS instance. Call `driver.extensions.VideojsHlsPlugin.adapt()` after player is ready. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
    <template>
      <div>
          <video ref="video" class="video-js" style="width: 100%; maxWidth: 500px"></video>
      </div>
    </template>

    <script>
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';

    export default {
      name: 'Player',
      data() {
        return {
          player: null
        }
      },
      mounted() {
        const src = '{PLAYLIST_URL}';

        const video = this.$refs.video;
        this.player = videojs(video, {
          autoplay: true,
          controls: true,
          sources: [{ src: src, type: 'application/vnd.apple.mpegurl' }]
        });
        // To configure the VideoJS Adapter by passing your VideoJS instance
        driver.extensions.VideojsHlsPlugin.adapt(this.player);
      },
      beforeUnmount() {
        if (this.player) {
          this.player.dispose();
        }
      }
    };
    </script>
```

Now start the service and view the request log in your browser. You should be able to find domains with .m3u8 and .ts extension from one of the CDN domains configured in the stream settings.

# Full example

See [vue demo](https://github.com/mlytics/stream-sdk-guide/tree/main/Video.js/vue-sample)