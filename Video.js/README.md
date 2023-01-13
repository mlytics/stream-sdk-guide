# Integration with Video.js

1. Install `P2SP-SDK`.

**`npm`**
```shell
npm install @mlytics/p2sp-sdk@0.8.0
```

**`cdn`**
```html
<script src="https://cdn.jsdelivr.net/npm/@mlytics/p2sp-sdk@0.8.0/bundle/driver.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mlytics/p2sp-sdk@0.8.0/bundle/peripheral/videojs-hls.min.js"></script>
```

2. Download `video.js` and `videojs-mux` for HLS integration.

**`npm`**
```shell
npm install video.js videojs-mux
```

**`cdn`**
```html
<script src="https://vjs.zencdn.net/7.18.0/video.min.js"></script>
<script src="https://src.litix.io/videojs/4/videojs-mux.js"></script>
```

3. Bind `video.js` with our HLS loader plugin manually if you install video.js via `npm`.

**`npm`**
```javascript
import videojs from 'video.js';
import { VideojsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/plugin';

VideojsHlsPlugin.register(videojs);
```

4. When page is loading, call `mlysdk.driver.initialize()`.

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

5. Configure our loader as HLS loader so that video would download via our SDK instead of general HTTP request.

**`npm`**
```javascript
import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

const video = document.getElementById('video');
const player = videojs(video, {
    ...
    html5: {
        hlsConfig: {
            loader: HLSLoader
        }
    }
    ...
});
```

**`cdn`**
```javascript
const video = document.getElementById('video');
const player = videojs(video, {
    ...
    html5: {
        hlsConfig: {
            loader: driver.integrations.HLSLoader
        }
    }
    ...
});
```

6. Add mux to collect data for analytics.

**`npm`**
```javascript
import "videojs-mux";

const player = videojs(video, {
    ...
    plugins: {
        mux: {
            data: {
                env_key: '...',
                sub_property_id: '...',
                view_session_id: '...',
                custom_1: '...'
            }
        }
    }
    ...
});
```

**`cdn`**
```javascript
const player = videojs(video, {
    ...
    plugins: {
        mux: {
            data: {
                env_key: '...',
                sub_property_id: '...',
                view_session_id: '...',
                custom_1: '...'
            }
        }
    }
    ...
});
```

I put some examples where this file located.
