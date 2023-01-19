import './App.css';

import { useEffect, useState } from 'react';

import { driver } from '@mlytics/p2sp-sdk/driver';
import Player from './components/Player';

function App() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    driver.initialize({
      client: {
        id: 'cehcdiphseaa0coe0c10',
        key: '3rFGoxUluezmM7ZyRj2NiQHsCpvJaDEY'
      }
    });
    setOptions({
      autoplay: true,
      controls: true,
      source: {
        src: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8',
        type: 'application/vnd.apple.mpegurl'
      },
      mux: {
        data: {
          env_key: "hmp0tvs823e2hovchm60o2m11",
          viewer_user_id: driver.info.sessionID,
          sub_property_id: "1001642588942",
          view_session_id: "cehcdiphseaa0coe0c00",
          custom_1: "cehcdiphseaa0coe0c10"
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {options ?
          <Player options={options} /> : null}
      </header>
    </div>
  );
}

export default App;
