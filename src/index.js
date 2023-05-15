import React from 'react';
import { createRoot } from 'react-dom/client';
// import { createHashRouter, RouterProvider } from 'react-router-dom';

import App from './app.js';

import './styles.scss';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
