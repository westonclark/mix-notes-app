import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.js';

import './styles.scss';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
