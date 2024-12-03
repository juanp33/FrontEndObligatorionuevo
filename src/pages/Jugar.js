import React, { useEffect, useState } from 'react';
import MasterPage from '../pages/masterPage';
import { useNavigate } from 'react-router-dom';
import '../styles/Jugar.css';
import iconoPerfil from '../images/iconoPerfil.png';
import audioManager from '../utils/AudioManager';

function Jugar() {
  const navigate = useNavigate();
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  
  useEffect(() => {
    if (isAudioInitialized) {
      audioManager.playMusic('musicaMenu');
    }

    
    return () => {
      audioManager.pauseAllMusic();
    };
  }, [isAudioInitialized]);

  
  const initializeAudio = () => {
    if (!isAudioInitialized) {
      setIsAudioInitialized(true);
    }
  };

  const handleGoToAjustes = () => {
    navigate('/Ajustes');
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

  const handleGoTolobby = () => {
    navigate('/lobby');
  };

  return (
    <div onClick={initializeAudio} onMouseEnter={initializeAudio}>
      {/* onClick y onMouseEnter inicializan el audio */}
      <MasterPage>
        <div className="jugar-container">
          <div className="left-panel">
            <div className="mode-buttons">
              <button className="mode-button" onClick={handleGoToJugarSolo}>SOLO</button>
              <button className="mode-button" onClick={handleGoTolobby}>COMPETITIVO</button>
              <button className="mode-button ranking-button" onClick={handleGoToRanking}>RANKING</button>
            </div>
          </div>
          <div className="user-card">
            <div className="user-image">
              <img src={iconoPerfil} alt="User" />
            </div>
            <div className="user-info">
              <h3>Nombre: {localStorage.getItem('username')}</h3>
              <p>Email: {localStorage.getItem('email')}</p>
             
            </div>
            <button className="cashier-button" onClick={handleGoToAjustes}>Ajustes</button>
            <button className="logout-button" onClick={handleLogout}>CERRAR SESIÓN</button>
          </div>
        </div>
      </MasterPage>
    </div>
  );
}

export default Jugar;