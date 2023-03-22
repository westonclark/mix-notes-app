import React from 'react';
import { useEffect, useState } from 'react';
import AudioPlayer from '../components/audioPlayer.js';

export default function Feed() {
  const [songList, setSongList] = useState({});

  function getSongs() {
    fetch('http://localhost:3000/files', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
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
      <span id="library-header">
        <h2 id="library">Library</h2>
        <button onClick={getSongs}>Refresh</button>
      </span>
      {songs}
    </div>
  );
}
