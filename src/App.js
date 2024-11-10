import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa tus páginas
import MasterPage from './pages/masterPage';
import Ajustes from './pages/Ajustes';
import Jugar from './pages/Jugar';
import PaginaCajero from './pages/PaginaCajero';
import PaginaRuleta from './pages/PaginaRuleta';
import Preguntas from './pages/Preguntas';
import PrivateRoute from './pages/PrivateRoute';
import IniciarSesion from './pages/IniciarSesion';
import PaginaRegistro from './pages/Registro';
import Lobby from './pages/Lobby';
import MultiplesLobbies from './pages/MultiplesLobbies';

function App() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <Routes>
        {/* Redirección en la raíz dependiendo del estado de sesión */}
        <Route
          path="/"
          element={username ? <Navigate to="/jugar" /> : <Navigate to="/login" />}
        />

        {/* Rutas de acceso público */}
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/register" element={<PaginaRegistro />} />

        {/* Rutas privadas */}
        <Route path="/paginaRuleta" element={<PrivateRoute><PaginaRuleta /></PrivateRoute>} />
        <Route path="/ajustes" element={<PrivateRoute><Ajustes /></PrivateRoute>} />
        <Route path="/preguntas" element={<PrivateRoute><Preguntas /></PrivateRoute>} />
        <Route path="/cajero" element={<PrivateRoute><PaginaCajero /></PrivateRoute>} />
        <Route path="/jugar" element={<PrivateRoute><Jugar /></PrivateRoute>} />
        <Route path="/lobby" element={<PrivateRoute><Lobby /></PrivateRoute>} />
        <Route path="/multipleslobbies" element={<PrivateRoute><MultiplesLobbies /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
