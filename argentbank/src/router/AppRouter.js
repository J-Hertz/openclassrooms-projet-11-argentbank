import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignInPage from '../pages/SignInPage/SignInPage';
import User from '../pages/User/User';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default AppRouter;
