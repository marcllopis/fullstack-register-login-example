import React, { useContext } from "react";
import { Context } from "./context/Provider";
import Error from "./components/Error";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const context = useContext(Context);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
