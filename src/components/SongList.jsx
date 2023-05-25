import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';

import Song from './Song.jsx';

function SongList() {
  const [queryParameters] = useSearchParams();
  const [projectId, setProjectId] = useState(queryParameters.get('projectId'));
  const [email, setEmail] = useState(queryParameters.get('email'));
  const [projectName, setProjectName] = useState(queryParameters.get('projectName'));
  const [songList, setSongList] = useState([]);

  function getSongs() {
    axios.get(`/api/songs/${projectId}`).then((res) => {
      setSongList(res.data);
    });
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];

    function handleSubmit(e) {
      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('email', email);
      formData.append('project_name', projectName);
      formData.append('project_id', projectId);
      formData.append('audiofile', file);

      axios
        .post('/api/songs', formData)
        .then((res) => {
          getSongs();
        })
        .catch((err) => ('Error occurred', err));
    }

    handleSubmit();
  }

  useEffect(() => {
    getSongs();
  }, []);

  let songs = [];

  return (
    <>
      {' '}
      <nav>
        <ul>
          <li>MIX NOTES</li>
        </ul>

        <ul>
          <li>{email}</li>
        </ul>
      </nav>
      <main className="container">
        <div id="songs">
          {/* <h1>{projectName}</h1> */}
          {email !== 'null' ? (
            <div id="upload-section">
              <label role="button" id="upload" htmlFor="file">
                Upload a File
                <input style={{ display: 'none' }} id="file" type="file" name="file" onChange={handleFileSelect}></input>
              </label>
            </div>
          ) : null}

          {songList.length ? songList.map((song) => <Song key={song.id} songData={song}></Song>) : null}
        </div>
      </main>
    </>
  );
}
export default SongList;
