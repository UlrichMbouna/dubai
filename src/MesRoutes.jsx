import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Patient from './components /patient/Patient';

const MesRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Patient />} />
      </Routes>
    </Router>
  );
};

export default MesRoutes;
