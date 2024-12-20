import React, { useState } from 'react';
import MasterPage from './masterPage';
import RuletaSolo from './RuletaSolo.js';
import PaginaPreguntaSolo from './PaginaPreguntaSolo'; 
import '../styles/PaginaRuleta.css';
import iconoPerfil from '../images/iconoPerfil.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaginaRuleta = () => {
  const { state } = useLocation(); 

  const [puntos, setPuntos] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const handleGoToMenu = () => {
    navigate('/jugar'); 
  };

  const [preguntaData, setPreguntaData] = useState();
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
      if(puntos>localStorage.getItem("puntajeMAX")){
        
        localStorage.setItem("puntajeMAX", puntos);
        
        fetch("http://localhost:8080/api/jugadores/actualizarPuntaje", {
          method: "POST", 
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", 
          },
          body: new URLSearchParams({
            nombre: username,
            puntos: puntos,
          }),
        })
      
      }
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

  const spinWheel = (callback) => {
    
    callback(''); 
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
              <RuletaSolo
                onSelectCategory={handleCategorySelect} 
                spinWheel={spinWheel} 
              />
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
          <PaginaPreguntaSolo 
            preguntaData={preguntaData}
            onAnswer={handleAnswer}
            puntos={puntos}
          />
        )}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{puntos>localStorage.getItem("puntajeMAX") ? "Nuevo Record!" : "Juego Terminado"}</h2>
              <p>Puntuación final: {puntos}</p>
              <button  className='modal-button-restart' onClick={resetGame}>Reiniciar</button>
              <button className='modal-button-menu' onClick={handleGoToMenu}>Volver Al Menu</button>
            </div>
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default PaginaRuleta;