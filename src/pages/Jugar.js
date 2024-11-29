import React, { useEffect, useState } from 'react';
import MasterPage from '../pages/masterPage';
import { useNavigate } from 'react-router-dom';
import '../styles/Jugar.css';
import iconoPerfil from '../images/iconoPerfil.png';
import audioManager from '../utils/AudioManager';

function Jugar() {
  const navigate = useNavigate();
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // Inicia la música cuando se haya inicializado el audio
  useEffect(() => {
    if (isAudioInitialized) {
      audioManager.playMusic('musicaMenu');
    }

    // Pausar toda la música al desmontar el componente
    return () => {
      audioManager.pauseAllMusic();
    };
  }, [isAudioInitialized]);

  // Inicializa el audio con la primera interacción del usuario
  const initializeAudio = () => {
    if (!isAudioInitialized) {
      setIsAudioInitialized(true);
    }
  };

  const handleGoToCajero = () => {
    navigate('/cajero');
  };

  const handleGoToJugarSolo = () => {
    navigate('/paginaRuleta');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleGoToRanking = () => {
    navigate('/ranking');
  };

  return (
    <div onClick={initializeAudio} onMouseEnter={initializeAudio}>
      {/* onClick y onMouseEnter inicializan el audio */}
      <MasterPage>
        <div className="jugar-container">
          <div className="left-panel">
            <button className="play-button">JUGAR</button>
            <div className="mode-buttons">
              <button className="mode-button" onClick={handleGoToJugarSolo}>SOLO</button>
              <button className="mode-button">COMPETITIVO</button>
              <button className="mode-button" onClick={handleGoToRanking}>RANKING</button>
            </div>
          </div>
          <div className="user-card">
            <div className="user-image">
              <img src={iconoPerfil} alt="User" />
            </div>
            <div className="user-info">
              <h3>{localStorage.getItem('username')}</h3>
              <p>{localStorage.getItem('email')}</p>
              <p>saldo: {localStorage.getItem('monto')} usd</p>
            </div>
            <button className="cashier-button" onClick={handleGoToCajero}>CAJERO</button>
            <button className="logout-button" onClick={handleLogout}>CERRAR SESIÓN</button>
          </div>
        </div>
      </MasterPage>
    </div>
  );
}

export default Jugar;