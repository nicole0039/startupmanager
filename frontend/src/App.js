import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import CatalystApp from './pages/CatalystApp';

function AppContent() {
  const location = useLocation();
  
  // Hide navbar for login, register, and all catalyst app routes
  const hideNavbar = [
    "/login", 
    "/register", 
    "/", 
    "/app", 
    "/catalystapp"
  ].includes(location.pathname);
  
  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<CatalystApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/app" element={<CatalystApp />} />
        <Route path="/catalystapp" element={<CatalystApp />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<CatalystApp />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
