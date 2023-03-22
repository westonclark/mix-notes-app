import React from 'react';
import { useEffect, useState } from 'react';
import AudioPlayer from '../components/audioPlayer.jsx';

export default function Feed() {
  let file;
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

  const [songList, setSongList] = useState({});

  function getSongs() {
    fetch('http://localhost:3000/files', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        setSongList(data);
      });
  }

  useEffect(() => {
    getSongs();
  }, []);

  let songs = [];
  for (let i = 0; i < songList.length; i++) {
    songs.push(<AudioPlayer songName={songList[i]} key={i}></AudioPlayer>);
  }

  return (
    <div>
      <div id="upload-section"></div>

      <div id="feed">
        <span id="library-header">
          <h2 id="library"></h2>
          <div>
            <label id="upload" htmlFor="file">
              Upload a File
            </label>
            <input id="file" type="file" name="file" onChange={handleFileSelect}></input>
            <button onClick={getSongs}>Refresh</button>
          </div>
        </span>
        {songs}
      </div>
    </div>
  );
}
