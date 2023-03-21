import React from 'react';
import Feed from './containers/feed.js';
import UploadSection from './containers/uploadSection.js';

const App = () => {
  return (
    <div>
      <UploadSection />
      <Feed />
    </div>
  );
};

export default App;
