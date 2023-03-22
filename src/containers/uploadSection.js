import React, { useEffect } from 'react';

export default function UploadSection() {
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
  }

  return (
    <div id="upload-section">
      <label id="upload" htmlFor="file">
        Upload a File
      </label>
      <input id="file" type="file" name="file" onChange={handleFileSelect}></input>
    </div>
  );
}
