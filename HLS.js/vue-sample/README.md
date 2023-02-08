---
title: vue
category: 63d9d34969da0c007a7219be
slug: hls-js-vue
---
# Integrate player

## Install SDK

Include the pre-build bundled scripts.

```text
npm install @mlytics/p2sp-sdk@latest
npm install mux-embed
```



## Install HLS.js

Include the latest HLS.js script.

```text
npm install hls.js
```



## Initialize SDK

To initialize SDK, we need to pass **driver.client.id** and **driver.client.key** attributes while calling intialize(). When page is loading, call driver.initialize() first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player/>
</template>

<script>
import { driver } from '@mlytics/p2sp-sdk/driver';

import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    Player
  },
  setup() {
    driver.initialize({
      client: { // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics portal
        id: 'CLIENT_ID',
        key: 'CLIENT_KEY'
      }
    });
  }
};
</script>
```



## Configure HLS loader

In order to use SDK to download the video, we need to specify HLS.js uses SDK loader. Call HLS.js like you normally would and include loader options with our loader. Here's an example showing how you could configure HLS loader with JavaScript.

```javascript
<template>
  <video id="video" ref="videoRef" style="width: 100%; maxwidth: 500px" />
</template>

<script>
import Hls from 'hls.js';
import mux from 'mux-embed';

import { driver } from '@mlytics/p2sp-sdk/driver';
import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

export default {
  name: 'Player',
  data() {
    return {
      hls: null,
    };
  },
  mounted() {
    const src = 'PLAYLIST_URL';

    const video = this.$refs.videoRef;
    if (Hls.isSupported() && !this.hls) {
      this.hls = new Hls({
        loader: HLSLoader,
      });
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
    }
  },
  beforeUnmount() {
    if (this.hls) this.hls.destroy();
  },
};
</script>
```



## Configure video monitor

In order to monitor the video experience, we need to pass **`<player><plugins><mux><data><env_key>`**, **`<player><plugins><mux><data><sub_property_id>`**, **`<player><plugins><mux><data><view_session_id>`** and **`<player><plugins><mux><data><custom_1>`** while calling HLS.js. Add SDK attributes using HLS.js options. Here's an example showing how you could configure a video monitor with JavaScript.

```javascript
mounted() {
  ...
  if (Hls.isSupported() && !this.hls) {
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
},
```

Now start the service and view the request log in your browser. You should be able to find domains with .m3u8 and .ts extension from one of the CDN domains configured in the stream settings.


# Full example

See [vue demo](https://github.com/mlytics/stream-sdk-guide/tree/main/HLS.js/vue-sample)