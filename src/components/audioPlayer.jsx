import React from 'react';
import { useEffect, useState } from 'react';

import DisplayTrack from './displayTrack.jsx';
import DisplayNotes from './displayNotes.jsx';

export default function AudioPlayer({ songName }) {
  return (
    <div className="audio-player">
      <DisplayTrack songName={songName} />
      <DisplayNotes />
    </div>
  );
}
