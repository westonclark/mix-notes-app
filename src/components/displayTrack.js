import React from 'react';
// import song from '.../uploads/730 Rosevelt Dr.mp3';

function DisplayTrack({ songName }) {
  return (
    <>
      <div>{songName}</div>
      <audio src={'http://localhost:3000/uploads/' + songName} controls />
    </>
  );
}
export default DisplayTrack;
