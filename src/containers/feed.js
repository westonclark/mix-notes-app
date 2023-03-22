import React from 'react';
import { useEffect, useState } from 'react';
import AudioPlayer from '../components/audioPlayer.js';

export default function Feed() {
  const [songList, setSongList] = useState({});

  function getSongs() {
    fetch('http://localhost:3000/files', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSongList(data);
      });
  }

  useEffect(() => {
    getSongs();
  }, []);

  let songs = [];

  for (let i = 0; i < songList.length; i++) {
    songs.push(<AudioPlayer songName={songList[i]} key={i}></AudioPlayer>);
  }
  
  return (
    <div id="feed">
      <button onClick={getSongs}>Refresh Feed</button>
      {songs}
    </div>
  );
}
