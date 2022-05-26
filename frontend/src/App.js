import React, { useContext } from 'react';
import { Context } from "./context/Provider";
import Error from './components/Error';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


function App() {
  const context = useContext(Context);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={ context.registration ? <Login /> : <Signup />} />
        <Route path="/login" element={context.loggedIn ? <Profile /> : <Login />} />
        <Route path="/profile" element={context.loggedIn ? <Profile /> : <Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="/redirect" element={< Navigate to="/error" />} />
      </Routes>
    </div>
  );
}

export default App;
