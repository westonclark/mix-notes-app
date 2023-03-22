import React from 'react';
import { useState } from 'react';

import DisplayTrack from './displayTrack';

export default function AudioPlayer({ songName }) {
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack songName={songName} />
      </div>
    </div>
  );
}
