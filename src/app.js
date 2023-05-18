import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import SongList from './components/SongList.jsx';
import ProjectList from './components/ProjectList.jsx';
import Signup from './components/Signup.jsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <ProjectList />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/songs',
      element: <SongList />,
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
