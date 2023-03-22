import React from 'react';
import AudioPlayer from '../components/audioPlayer.js';

export default function Feed() {
  let songs;
  function getSongs() {
    fetch('http://localhost:3000/files')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div id="feed">
      <button onClick={getSongs}>Refresh Feed</button>
      <AudioPlayer></AudioPlayer>
    </div>
  );
}
