import React from 'react';
import MasterPage from '../pages/masterPage';
import '../styles/Jugar.css';
import iconoPerfil from '../images/iconoPerfil.png';
function Jugar() {
  return (
    <MasterPage>
      <div className="jugar-container">
        <div className="left-panel">
          <button className="play-button">JUGAR</button>
          <div className="mode-buttons">
            <button className="mode-button">SOLO</button>
            <button className="mode-button">VS BOTS</button>
            <button className="mode-button">APUESTAS</button>
            <button className="mode-button">COMPETITIVO</button>
          </div>
        </div>
        <div className="user-card">
          <div className="user-image">
            <img src={iconoPerfil} alt="User" />
          </div>
          <div className="user-info">
            <h3>{localStorage.getItem("username")}</h3>
            
            <p>saldo: 5.00 usd</p>
          </div>
          <button className="cashier-button">CAJERO</button>
          <button className="logout-button">CERRAR SESION</button>
        </div>
      </div>
    </MasterPage>
  );
}

export default Jugar;
