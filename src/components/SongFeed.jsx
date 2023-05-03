import React from 'react';
import { useEffect, useState } from 'react';
import Song from './Song.jsx';

export default function Feed() {
  let file;

  const [songList, setSongList] = useState({});

  function getSongs() {
    fetch('http://localhost:3000/files', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        setSongList(data);
      });
  }

  function handleFileSelect(e) {
    file = e.target.files;
    for (let i = 0; i <= file.length - 1; i++) {
      file = file[i];
    }
    function handleSubmit(e) {
      const formData = new FormData();
      formData.append('username', 'myCatCrouton');
      formData.append('files', file);

      fetch('http://localhost:3000/addfile', {
        method: 'post',
        body: formData,
        mode: 'no-cors',
      })
        .then((res) => console.log(res))
        .catch((err) => ('Error occurred', err));
    }

    handleSubmit();
    getSongs();
  }

  useEffect(() => {
    getSongs();
  }, []);

  let songs = [];
  for (let i = 0; i < songList.length; i++) {
    songs.push(<Song songName={songList[i]} key={i}></Song>);
  }

  return (
    <>
      <div id="upload-section">
        <div>
          <label id="upload" htmlFor="file">
            Upload a File
          </label>
          <input id="file" type="file" name="file" onChange={handleFileSelect}></input>
          <button id="refresh" onClick={getSongs}>
            Refresh
          </button>
        </div>
      </div>
      <div id="feed">{songs}</div>
    </>
  );
}
