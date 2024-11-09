// PaginaRuleta.js
import React, { useState } from 'react';
import MasterPage from './masterPage';
import Ruleta from './Ruleta';
import PaginaPregunta from './PaginaPregunta';
import '../styles/PaginaRuleta.css'; 
import iconoPerfil from '../images/iconoPerfil.png';
import { useNavigate } from 'react-router-dom';

const PaginaRuleta = () => {
  const [puntos, setPuntos] = useState(0);
  const [preguntaData, setPreguntaData] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false); // Nuevo estado para mostrar el modal
  const [isNewRecord, setIsNewRecord] = useState(false); 
  const navigate = useNavigate();
  const handleGoToJugar = () => {
    navigate('/jugar'); // Redirige a la ruta /cajero
  };

  const fetchPregunta = (categoria) => {
    fetch(`http://localhost:8080/api/chatgpt/pregunta?categoria=${encodeURIComponent(categoria)}`)
      .then((response) => response.json())
      .then((data) => setPreguntaData(data))
      .catch((error) => console.error('Error al obtener la pregunta:', error));
  };

  const handleCategorySelect = (category) => {
    fetchPregunta(category);
  };

  // Maneja la respuesta del usuario en `PaginaPregunta`
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setPuntos((prevPuntos) => prevPuntos + 1); // Incrementa puntos si es correcta
      setPreguntaData(null); // Limpia la pregunta para volver a la ruleta
    } else {
      setIsGameOver(true); // Termina el juego si es incorrecta
      setShowModal(true); // Mostrar el modal en lugar del alert
      if (puntos > localStorage.getItem("puntajeMAX")) {
        localStorage.setItem("puntajeMAX", puntos);
        setIsNewRecord(true);
      }else{
        setIsNewRecord(false);
      }
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setPuntos(0);
    setPreguntaData(null);
    setIsGameOver(false);
    setShowModal(false); // Oculta el modal cuando se reinicia el juego
    setIsNewRecord(false);
  };

  return (
    <MasterPage>
      <div className="jugar-page">
        {/* Mostramos solo la ruleta si no hay una pregunta cargada y el juego no ha terminado */}
        {!preguntaData && !isGameOver && (
          <>
            {/* Tarjeta de jugador izquierda */}
            <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{localStorage.getItem("username")}</h2>
              <div className="player-record"></div>
            </div>

            {/* Contenedor de la ruleta */}
            <div className="ruleta-container">
              <Ruleta onSelectCategory={handleCategorySelect} />
            </div>

            {/* Tarjeta de puntuación */}
            <div className="score-card">
              <h2>PUNTUACIÓN ACTUAL</h2>
              <p>{puntos}</p>
              <h2>PUNTUACIÓN MÁXIMA</h2>
              <p>{localStorage.getItem("puntajeMAX")}</p> {/* Ajusta este valor si tienes un sistema de puntuación máxima */}
            </div>
          </>
        )}

        {/* Mostramos solo la pregunta si `preguntaData` tiene datos */}
        {preguntaData && (
          <PaginaPregunta
            preguntaData={preguntaData}
            onAnswer={handleAnswer}
            puntos={puntos}
          />
        )}

        {/* Modal de juego terminado */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{isNewRecord ? '¡Felicitaciones, rompiste tu récord!' : 'Juego terminado'}</h2>
              <p>Puntuación final: {puntos}</p>
              <button className="modal-button" onClick={resetGame}>Reiniciar Juego</button>
              <button className="modal-button" onClick={handleGoToJugar}>Volver al Menú</button>
            </div>
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuleta;