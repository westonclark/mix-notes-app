import React from 'react';

function DisplayTrack({ songName }) {
  return (
    <div className="name-and-player">
      <div id="song-name">{songName}</div>
      <audio id="audio" src={'http://localhost:3000/uploads/' + songName} controls />
    </div>
  );
}
export default DisplayTrack;
