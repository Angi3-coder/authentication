import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path = "/signup" element = {<SignUp />}/>
        <Route path='/login' element = {<Login />} />
        <Route path='/profile' element = {<Profile />} />
        <Route path='/admin/dashboard' element={<AdminPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
