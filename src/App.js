import React from 'react';
// import MasterPage from './pages/masterPage';
// import Ajustes from './pages/Ajustes';

 import Jugar from './pages/Jugar';
// import Ruleta from './pages/Ruleta';
// import PaginaRuleta from './pages/PaginaRuleta';
// import Preguntas from './pages/Preguntas';
import PrivateRoute from './pages/PrivateRoute';
import IniciarSesion from './pages/IniciarSesion';
import PaginaRegistro from './pages/Registro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    
       <Router>
      <Routes>
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/register" element={<PaginaRegistro />} /> 
        <Route path="/jugar" element={<PrivateRoute><Jugar /></PrivateRoute>} />
      </Routes>
    </Router>
    
    
  );
}

export default HomePage;