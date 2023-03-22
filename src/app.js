import React from 'react';
import Feed from './containers/feed.js';
import UploadSection from './containers/uploadSection.js';

const App = () => {
  return (
    <div>
      <h1>Mix Notes</h1>
      <hr></hr>
      <UploadSection />
      <Feed />
    </div>
  );
};

export default App;
