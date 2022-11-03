import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(() => import('@pages/Login'), {
  fallback: <div className="loading">로딩중</div>,
});
const Signup = loadable(() => import('@pages/Signup'), {
  fallback: <div className="loading">로딩중</div>,
});
const Workspace = loadable(() => import('@layouts/Workspace'), {
  fallback: <div className="loading">로딩중</div>,
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workspace/:workspace/*" element={<Workspace />} />
    </Routes>
  );
};

export default App;
