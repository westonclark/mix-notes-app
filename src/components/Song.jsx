import React from 'react';
import { useEffect, useState } from 'react';

export default function Song({ songData }) {
  const [notes, setNotes] = useState([]);
  const [userInput, setUserInput] = useState('');

  const addNote = (userInput) => {
    let copy = [...notes];
    copy = [...copy, userInput];
    setNotes(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(userInput);
    setUserInput('');
  };

  const notesList = [];
  for (let i = 0; i < notes.length; i++) {
    notesList.push(
      <div className="note" key={i}>
        <input type="checkbox"></input>
        <div className="note-text" key={notes[i]}>
          {notes[i]}
        </div>
      </div>
    );
  }

  return (
    <div className="song">
      <div className="song-top">
        <div className="song-name">{songData.name}</div>
        <audio className="audio" src={songData.url} controls />
        <form className="input-and-button">
          <input className="note-input" value={userInput} type="text" onChange={(e) => setUserInput(e.target.value)}></input>
          <button id="add-note-button" class="outline" onClick={handleSubmit}>
            Add Note
          </button>
        </form>
      </div>
      <div className="song-bottom">
        <div className="notes-list">{notesList}</div>
      </div>
    </div>
  );
}
