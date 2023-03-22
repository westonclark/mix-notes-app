import React from 'react';

import DisplayTrack from './displayTrack.jsx';

export default function AudioPlayer({ songName }) {
  return (
    <div className="audio-player">
      <DisplayTrack songName={songName} />
      {/* <label htmlFor="comments">Add Comments</label>
      <input id="comments" type="text" name="comments"></input> */}
    </div>
  );
}
