---
title: Disable P2P mode
category: 63d9d34969da0c007a7219be
slug: ad-disable-p2p-mode
---

We offer two methods to disable P2P mode, one is on dashboard, and the other is on client side.

Here is an example showing how you could disable P2P on client side with JavaScript.

```javascript
const driver = mlysdk.driver.initialize({
  client: { // here is your 'CLIENT_ID' and 'CLIENT_KEY' from mlytics portal
    id: 'CLIENT_ID',
    key: 'CLIENT_KEY'
  }
  system: {
    isP2PAllowed: false
  }
});
```
