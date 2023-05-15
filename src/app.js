import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <h1>Mix Notes</h1>
      <hr></hr> */}
    </>
  );
};

export default App;
