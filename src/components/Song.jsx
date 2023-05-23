import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Song({ songData }) {
  const [notes, setNotes] = useState([]);
  const [userInput, setUserInput] = useState('');

  function uploadNote(e) {
    e.preventDefault();
    axios.post(`/api/notes`, { content: userInput, complete: false, song_id: songData.id }).then((response) => {
      setUserInput('');
      getNotes();
    });
  }

  function getNotes() {
    axios.get(`/api/notes/${songData.id}`).then((response) => setNotes(response.data));
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="song">
      <div className="song-top">
        <div className="song-name">{songData.name}</div>
        <audio className="audio" src={songData.url} controls />
        <form className="input-and-button">
          <input className="note-input" value={userInput} type="text" onChange={(e) => setUserInput(e.target.value)}></input>
          <button id="add-note-button" className="outline" onClick={uploadNote}>
            Add Note
          </button>
        </form>
      </div>
      <div className="song-bottom">
        <div className="notes-list">
          {notes
            .map((note) => {
              return <Note key={note.id} note={note}></Note>;
            })
            .sort((a, b) => {
              return a.key - b.key;
            })}
        </div>
      </div>
    </div>
  );
}

function Note({ note }) {
  function toggleCheck(id, checked) {
    axios.patch(`/api/notes/${id}`, { newValue: checked });
  }

  return (
    <div className="note" key={note.id}>
      <input
        type="checkbox"
        id={note.id}
        defaultChecked={note.complete}
        onClick={(e) => {
          toggleCheck(note.id, e.target.checked);
        }}
      />
      <label htmlFor={note.id}> {note.content}</label>
    </div>
  );
}
