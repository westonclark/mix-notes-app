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
      element: <ProjectList />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/songs',
      element: <SongList />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
