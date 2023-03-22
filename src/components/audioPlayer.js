import React from 'react';
import { useState } from 'react';

import DisplayTrack from './displayTrack';
import Controls from './controls';
import ProgressBar from './progressBar';

export default function AudioPlayer() {

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack />
        <Controls />
        <ProgressBar />
      </div>
    </div>
  );
}
