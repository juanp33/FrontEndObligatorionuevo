import React from 'react';
import MasterPage from './pages/masterPage';
import Ajustes from './pages/Ajustes';
import IniciarSesion from './pages/IniciarSesion';
import Jugar from './pages/Jugar';
import Ruleta from './pages/Ruleta';
import PaginaRuleta from './pages/PaginaRuleta';
import Preguntas from './pages/Preguntas';
import PaginaRegistro from './pages/Registro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    
       <Router>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/register" element={<PaginaRegistro />} /> 
      </Routes>
    </Router>
    
    
  );
}

export default HomePage;