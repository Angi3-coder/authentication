import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path = "/signup" element = {<SignUp />}/>
        <Route path='/login' element = {<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
