import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Patient from './components /patient/Patient';
// import Login from './components /patient/Login';
import Login from './components /patient/Login';
import Register from './components /patient/Register';
import LoginRegister from './components /patient/LoginRegister';
import DynamicBackground from './components /patient/DynamicBackground';
import Home from './components /patient/Home';

const MesRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />



      </Routes>
    </Router>
  );
};

export default MesRoutes;
