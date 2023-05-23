import React from 'react';
import { useEffect, useState } from 'react';

export default function Song({ songData }) {
  return (
    <div className="song">
      <p id="song-name">{songData.name}</p>
      <audio id="audio" src={songData.url} controls />
      <SongNotes />
    </div>
  );
}

function SongNotes() {
  const [notes, setNotes] = useState([]);
  const [userInput, setUserInput] = useState('');

  const addNote = (userInput) => {
    let copy = [...notes];
    copy = [...copy, userInput];
    setNotes(copy);
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(userInput);
    setUserInput('');
  };

  const notesList = [];
  for (let i = 0; i < notes.length; i++) {
    notesList.push(
      <div id="note" key={i}>
        <input type="checkbox"></input>
        <div className="note-text" key={notes[i]}>
          {notes[i]}
        </div>
      </div>
    );
  }

  return (
    <div id="add-note-and-list">
      <form id="input-and-button">
        <input value={userInput} type="text" onChange={handleChange}></input>
        <button id="add-note-button" onClick={handleSubmit}>
          Add Note
        </button>
      </form>
      <div id="notes-list">{notesList}</div>
    </div>
  );
}
