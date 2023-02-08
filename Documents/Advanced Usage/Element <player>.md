---
title: Element <Player>
category: 63d9d34969da0c007a7219be
slug: ad-player-html-elements
---
**`<autoplay>`**:

A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.

**`<control>`**:

If this attribute is present, the browser will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback.

**`<preload>`**:

This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience regarding what content is loaded before the video is played. It may have one of the following values:

- none: Indicates that the video should not be preloaded.
- metadata: Indicates that only video metadata (e.g. length) is fetched.
- auto: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.
- empty string: Synonym of the auto value.

**`<plugins><mux><data><env_key>`**:

this is a client-side key used for user monitoring. Your env key from the Mlytics dashboard.

**`<plugins><mux><data><viewer_user_id>`**:

an ID representing the viewer who is watching the stream. Use this to look up video views for an individual viewer.

**`<plugins><mux><data><sub_property_id>`**:

a sub-property is an optional way to group data within a property.

**`<plugins><mux><data><view_session_id>`**:

an ID that can be used to correlate the view with platform services upstream such as CDN or origin logs.

**`<plugins><mux><data><custom_1>`**:

an ID representing the SDK client. The value will be the same as **`<driver><client.key>`**.