import React from 'react';
import MasterPage from '../pages/masterPage';
import { useNavigate } from 'react-router-dom';
import '../styles/Jugar.css';
import iconoPerfil from '../images/iconoPerfil.png';

function Jugar() {
  const navigate = useNavigate();
  const handleGoToCajero = () => {
    navigate('/cajero'); // Redirige a la ruta /cajero
  };
  const handleGoToJugarSolo = () => {
    navigate('/paginaRuleta'); // Redirige a la ruta /cajero
  };
  const handleLogout = () => {
    localStorage.clear(); // Limpia el username de localStorage
    navigate('/login'); // Redirige a la página de inicio de sesión
  };
  const handleGoToRanking = () => {
    navigate('/ranking'); // Redirige a la ruta /ranking
  };
  
  return (
    <MasterPage>
      <div className="jugar-container">
        <div className="left-panel">
          <button className="play-button">JUGAR</button>
          <div className="mode-buttons">
            <button className="mode-button" onClick={handleGoToJugarSolo}>SOLO</button>
           
            
            <button className="mode-button" >COMPETITIVO</button>
            <button className="mode-button"onClick={handleGoToRanking}>RANKING</button>
          </div>
        </div>
        <div className="user-card">
          <div className="user-image">
            <img src={iconoPerfil} alt="User" />
          </div>
          <div className="user-info">
            <h3>{localStorage.getItem("username")}</h3>
            <p>{localStorage.getItem("email")}</p>
            <p>saldo: {localStorage.getItem("monto")} usd</p>
          </div>
          <button className="cashier-button" onClick={handleGoToCajero}>CAJERO</button>
          <button className="logout-button" onClick={handleLogout}>CERRAR SESION</button>
        </div>
      </div>
    </MasterPage>
  );
}

export default Jugar;
