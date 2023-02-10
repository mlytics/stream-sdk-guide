import { useEffect, useState } from 'react';

import videojs from 'video.js';

import { driver, VideojsHlsSourcePlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

import './App.css';
import Player from './components/Player';

VideojsHlsSourcePlugin.register(videojs);

const App = () => {
  const [options, setOptions] = useState(null);
  useEffect(() => {
    driver.initialize();
    setOptions(
      {
        autoplay: true,
        controls: true,
        sources: [{
          src: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8',
          type: 'application/vnd.apple.mpegurl'
        }]
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {options ? <Player options={options} /> : null}
      </header>
    </div>
  );
}


export default App;
