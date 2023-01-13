# Integration with DPlayer

1. Install `P2SP-SDK`.

**`npm`**
```shell
npm install @mlytics/p2sp-sdk@0.8.0
```

**`cdn`**
```html
<script src="https://cdn.jsdelivr.net/npm/@mlytics/p2sp-sdk@0.8.0/bundle/driver.min.js"></script>
```

2. Download `DPlayer` and `mux` for HLS integration.

**`npm`**
```shell
npm install dplayer mux-embed
```

**`cdn`**
```html
<script src="https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js"></script>
<script src="https://src.litix.io/core/4/mux.js"></script>
```

3. When page is loading, call `mlysdk.driver.initialize()`.

**`npm`**
```javascript
import { driver } from '@mlytics/p2sp-sdk/driver';

driver.initialize({
    client: {
        id: '...',
        key: '...'
    }
});
```

**`cdn`**
```javascript
const driver = mlysdk.driver.initialize({
    client: {
        id: '...',
        key: '...'
    }
});
```

4. Configure our loader as HLS loader so that video would download via our SDK instead of general HTTP request.

**`npm`**
```javascript
import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';
import DPlayer from 'dplayer';
import Hls from 'hls.js';

const dp = new DPlayer({
    ...
    video: {
        url: '...',
        type: 'customHls',
        customType: {
            customHls: function (video) {
                const hls = new Hls({
                    loader: HLSLoader
                });
                hls.loadSource(video.src);
                hls.attachMedia(video);
            }
        }
    }
});
```

**`cdn`**
```javascript
const dp = new window.DPlayer({
    ...
    video: {
        url: '...',
        type: 'customHls',
        customType: {
            customHls: function (video) {
                const hls = new Hls({
                    loader: driver.integrations.HLSLoader
                });
                hls.loadSource(video.src);
                hls.attachMedia(video);
            }
        }
    }
});
```

5. Add `mux.monitor()` to collect data for analytics.

**`npm`**
```javascript
import mux from 'mux-embed';

mux.monitor(dp.video, {
    data: {
        env_key: '...',
        sub_property_id: '...',
        view_session_id: '...',
        custom_1: '...'
    }
});
```

**`cdn`**
```javascript
mux.monitor(dp.video, {
    data: {
        env_key: '...',
        sub_property_id: '...',
        view_session_id: '...',
        custom_1: '...'
    }
});
```

I put some examples where this file located.
