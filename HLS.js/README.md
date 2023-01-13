# Integration with HLS.js

1. Install `P2SP-SDK`.

**`npm`**
```shell
npm install @mlytics/p2sp-sdk@0.8.0
```

**`cdn`**
```html
<script src="https://cdn.jsdelivr.net/npm/@mlytics/p2sp-sdk@0.8.0/bundle/driver.min.js"></script>
```

2. Download `hls.js` and `mux` for HLS integration.

**`npm`**
```shell
npm install hls.js mux-embed
```

**`cdn`**
```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@1.1.5"></script>
<script src="https://src.litix.io/core/4/mux.js"></script>
```

3. When page is loading, call `driver.initialize()`.

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
import Hls from 'hls.js'
import { HLSLoader } from '@mlytics/p2sp-sdk/driver/integration/streaming/hls';

const video = document.getElementById('video');
let hls = new Hls({
    loader: HLSLoader
});
hls.loadSource('...');
hls.attachMedia(video);
```

**`cdn`**
```javascript
const video = document.getElementById('video');
let hls = new Hls({
    loader: driver.integrations.HLSLoader
});
hls.loadSource('...');
hls.attachMedia(video);
```

5. Add `mux.monitor()` to collect data for analytics.

**`npm`**
```javascript
import mux from 'mux-embed';

mux.monitor(video, {
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
mux.monitor(video, {
    data: {
        env_key: '...',
        sub_property_id: '...',
        view_session_id: '...',
        custom_1: '...'
    }
});
```

I put some examples where this file located.
