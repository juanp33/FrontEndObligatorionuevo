import React, { useState } from 'react';
import MasterPage from './masterPage';
import Ruleta from './Ruleta';
import PaginaPregunta from './PaginaPregunta';
import '../styles/PaginaRuleta.css';
import iconoPerfil from '../images/iconoPerfil.png';
import { useLocation } from 'react-router-dom';
import useMultiplayer from './UseMultiplayer';
import useWebSocket from './UseWebSocket';

const PaginaRuleta = () => {
  const { state } = useLocation(); // Obtiene el estado pasado desde GameRoom
  const isMultiplayer = state?.isMultiplayer || false; // Determina si es multijugador
  const lobbyId = state?.lobbyId || null;
  const { client, lobbyMessages,lobbyMessagesJugador1,lobbyMessagesJugador2 } = useWebSocket(lobbyId);
  const [puntos, setPuntos] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem('username');

  // Llamamos a `useMultiplayer` siempre, pero configuramos su lógica dependiendo del modo
  const {
    esMiTurno,
    preguntaData,
    setPreguntaData,
    enviarTurno,
    lobbyActivo,
  } = useMultiplayer(lobbyId, username);

  // Si no es multijugador, se define que el turno siempre está activo
  const isTurnoActivo = !isMultiplayer || esMiTurno;

  const fetchPregunta = (categoria) => {
   
    fetch(`http://localhost:8080/api/chatgpt/pregunta?categoria=${encodeURIComponent(categoria)}`)
      .then((response) => response.json())
      .then((data) => setPreguntaData(data))
      .catch((error) => console.error('Error al obtener la pregunta:', error));
  };

  const handleCategorySelect = (category) => {
    fetchPregunta(category);
  };

  const handleAnswer = (isCorrect) => {
   
    
    if (isCorrect) {
      setPuntos((prevPuntos) => prevPuntos + 1);
    } else {
      setIsGameOver(true);
      setShowModal(true);
    }
    
    setPreguntaData(null);

    
  };

  const resetGame = () => {
    setPuntos(0);
    setPreguntaData(null);
    setIsGameOver(false);
    setShowModal(false);
  };

  return (
    <MasterPage>
      <div className="jugar-page">
        {!preguntaData && !isGameOver && (
          <>
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{username}</h2>
            </div>
            <div className="ruleta-container">
              {/* Solo permite interactuar con la ruleta si es el turno del jugador */}
              <Ruleta onSelectCategory={handleCategorySelect} forcedCategory={"Entretenimiento"} disabled={!isTurnoActivo} />
            </div>
            <div className="score-card">
              <h2>PUNTUACIÓN ACTUAL</h2>
              <p>{puntos}</p>
              <h2>PUNTUACIÓN MÁXIMA</h2>
              <p>{localStorage.getItem("puntajeMAX")}</p>
            </div>
          </>
        )}
        {preguntaData && (
          <PaginaPregunta
            preguntaData={preguntaData}
            onAnswer={handleAnswer}
            puntos={puntos}
          />
        )}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Juego terminado</h2>
              <p>Puntuación final: {puntos}</p>
              <button onClick={resetGame}>Reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuleta;
