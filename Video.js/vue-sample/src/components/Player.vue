<template>
    <div>
        <video ref="video" class="video-js" style="width: 100%; maxWidth: 800px"></video>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Player',
    props: {
        options: {
            type: Object
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.video, this.options);
        driver.extensions.VideojsHlsPlugin.adapt(this.player);
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
}
</script>
