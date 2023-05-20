import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';

import Song from './Song.jsx';

function SongList() {
  const [queryParameters] = useSearchParams();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [songList, setSongList] = useState(['abc']);

  function getSongs() {
    axios.get(`/api/songs/${projectId}`).then((res) => {
      console.log(res);
      setSongList(res.data);
      // for (let i = 0; i < songList.length; i++) {
      //   songs.push(<p>{songList[i]}</p>);
      //   console.log(songList[i]);
      // }
    });
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];

    function handleSubmit(e) {
      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('project_name', projectName);
      formData.append('project_id', projectId);
      formData.append('audiofile', file);

      axios
        .post('/api/songs', formData)
        .then((res) => {
          console.log(res);
          getSongs();
        })
        .catch((err) => ('Error occurred', err));
    }

    handleSubmit();
    // getSongs();
  }

  useEffect(() => {
    setProjectId(queryParameters.get('projectId'));
    setProjectName(queryParameters.get('projectName'));
    // getSongs();
  }, []);

  let songs = [];

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
      {/* <p>{songList}</p> */}
      <div id="feed">{songList.length ? songList.map((song) => <p key={song.name}>{song.name}</p>) : null}</div>
    </div>
  );
}
export default SongList;
