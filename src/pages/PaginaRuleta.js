import React from 'react';
import MasterPage from './masterPage';
import Ruleta from './Ruleta';
import '../styles/PaginaRuleta.css'; // Asegúrate de tener los estilos en este archivo
import iconoPerfil from '../images/iconoPerfil.png';
const PaginaRuleta = ({ multiplayer }) => {
  return (
    <MasterPage>
      <div className="jugar-page">
        {/* Tarjeta de jugador izquierda */}
        <div className="player-card">
          <img
            src={ iconoPerfil}
            alt="Player 1"
            className="player-image"
          />
          <h2>JAMES WILLIAMS</h2>
          <div className="player-record">
            <p>RECORD</p>
            <p>W: 10</p>
            <p>L: 5</p>
          </div>
        </div>

        {/* Contenedor de la ruleta */}
        <div className="ruleta-container">
          <Ruleta />
        </div>

        {/* Tarjeta de jugador derecha, solo si multiplayer es true */}
        {multiplayer && (
          <div className="player-card">
            <img
              src={iconoPerfil}
              alt="Player 2"
              className="player-image"
            />
            <h2>JAKE TRUMP</h2>
            <div className="player-record">
              <p>RECORD</p>
              <p>W: 8</p>
              <p>L: 7</p>
            </div>
          </div>
        )}

        {/* Tarjeta de puntuación si multiplayer es false */}
        {!multiplayer && (
          <div className="score-card">
            <h2>PUNTUACIÓN ACTUAL</h2>
            <p>50</p>
            <h2>PUNTUACIÓN MÁXIMA</h2>
            <p>76</p>
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuleta;
