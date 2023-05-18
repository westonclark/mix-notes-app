import React from 'react';
import { useEffect, useState } from 'react';
import Song from './Song.jsx';
import { useSearchParams } from 'react-router-dom';

export default function Feed() {
  const [queryParameters] = useSearchParams();
  // const [projectId, setProjectId] = useState('');
  const [songList, setSongList] = useState({});

  console.log('projectid', queryParameters.get('projectId'));

  // function getSongs() {
  //   fetch('http://localhost:3000/songs', { mode: 'cors' })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSongList(data);
  //     });
  // }

  function handleFileSelect(e) {
    const file = e.target.files;
    for (let i = 0; i <= file.length - 1; i++) {
      file = file[i];
    }
    function handleSubmit(e) {
      const formData = new FormData();
      formData.append('username', 'myCatCrouton');
      formData.append('files', file);

      fetch('http://localhost:3000/songs', {
        method: 'post',
        body: formData,
        mode: 'no-cors',
      }).catch((err) => ('Error occurred', err));
    }

    handleSubmit();
    // getSongs();
  }

  // useEffect(() => {
  //   getSongs();
  // }, []);

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
          <button id="refresh">Refresh</button>
        </div>
      </div>
      <div id="feed">{songs}</div>
    </>
  );
}
