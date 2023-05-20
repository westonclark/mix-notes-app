import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Song from './Song.jsx';

function SongList() {
  const [queryParameters] = useSearchParams();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [songList, setSongList] = useState({});

  function getSongs() {
    fetch('http://localhost:3000/songs', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        setSongList(data);
      });
  }

  function handleFileSelect(e) {
    const file = e.target.files;
    // for (let i = 0; i <= file.length - 1; i++) {
    //   file = file[i];
    // }
    console.log(file[0].name);
    function handleSubmit(e) {
      const formData = new FormData();
      formData.append('name', `/${projectName}/${file[0].name}`);
      formData.append('project_id', projectId);
      formData.append('audiofile', file);

      fetch('http://localhost:3000/songs', {
        method: 'post',
        body: formData,
        mode: 'no-cors',
      }).catch((err) => ('Error occurred', err));
    }

    // handleSubmit();
    // getSongs();
  }

  useEffect(() => {
    // getSongs();
    setProjectId(queryParameters.get('projectId'));
    setProjectName(queryParameters.get('projectName'));
  }, []);

  let songs = [];
  for (let i = 0; i < songList.length; i++) {
    songs.push(<Song songName={songList[i]} key={i}></Song>);
  }

  return (
    <div id="songs">
      <h1>{projectName}</h1>
      <div id="upload-section">
        <div>
          <label role="button" id="upload" htmlFor="file">
            Upload a File
            <input id="file" type="file" name="file" onChange={handleFileSelect}></input>
          </label>
        </div>
        <button id="refresh">Refresh</button>
      </div>
      <div id="feed">{songs}</div>
    </div>
  );
}
export default SongList;
