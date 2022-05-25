import Error from './components/Error';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={} /> */}
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
