import React from 'react';
/// import MasterPage from './pages/masterPage';
 import Ajustes from './pages/Ajustes';
 import Lobby from './pages/Lobbies';
 import GameRoom from './pages/GameRoom';
 import Jugar from './pages/Jugar';
 import PaginaCajero from './pages/PaginaCajero';
 import PaginaRuleta from './pages/PaginaRuleta';
 import Preguntas from './pages/Preguntas';
import PrivateRoute from './pages/PrivateRoute';
import IniciarSesion from './pages/IniciarSesion';
import PaginaRegistro from './pages/Registro';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';

function HomePage() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={username ? <Navigate to="/jugar" /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/register" element={<PaginaRegistro />} />
        <Route path="/paginaRuleta" element={<PrivateRoute><PaginaRuleta multiplayer ={false} /></PrivateRoute>} />
        <Route path="/ajustes" element={<PrivateRoute><Ajustes /></PrivateRoute>} />
        <Route path="/preguntas" element={<PrivateRoute><Preguntas /></PrivateRoute>} />
        <Route path="/cajero" element={<PrivateRoute><PaginaCajero /></PrivateRoute>} />
        <Route path="/jugar" element={<PrivateRoute><Jugar /></PrivateRoute>} />
        <Route path="/lobby" element={<PrivateRoute><Lobby /></PrivateRoute>} />
        <Route path="/lobby/:lobbyId" element={<PrivateRoute><GameRoom /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default HomePage;