import React from 'react';

export default function UploadSection() {
  return (
    <div id="upload-section">
      <input id="song-name" placeholder="Song Name"></input>
      <input id="uploaded-by" placeholder="Uploaded By"></input>
      <button id="choose-file">Choose File</button>
      <button id="upload">Upload</button>
    </div>
  );
}
