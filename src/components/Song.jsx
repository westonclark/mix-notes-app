import React from 'react';
import { useEffect, useState } from 'react';

import SongAudio from './SongAudio.jsx';
import SongNotes from './SongNotes.jsx';

export default function Song({ songName }) {
  return (
    <div className="song">
      <SongAudio songName={songName} />
      <SongNotes />
    </div>
  );
}
