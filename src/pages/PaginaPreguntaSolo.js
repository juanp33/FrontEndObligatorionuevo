import React, { useEffect, useState } from 'react';
import '../styles/Preguntas.css';
import iconoPerfil from '../images/iconoPerfil.png';


const PaginaPreguntaSolo = ({ preguntaData, onAnswer, puntos, desabilitado, lobbyId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const username = localStorage.getItem('username');
  
  const handleOptionClick = (opcion) => {

    const acierto = opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97];
    setSelectedOption(opcion);
    setIsCorrect(acierto);
    
    // Llama a onAnswer después de la respuesta sin detener el juego
    setTimeout(() => {
      onAnswer(acierto);
      setSelectedOption(null);
      setIsCorrect(null);
    }, 5000);
  };

  return (
    <div className="juego-container">
      <div className="player-card">
              <img src={iconoPerfil} alt="Player 1" className="player-image" />
              <h2>{username}</h2>
            </div>
      <div className="pregunta-box">
        <div className="pregunta">
          <p>{preguntaData.enunciado}</p>
        </div>
        <div className="opciones">
          {preguntaData.respuestas.map((opcion, index) => (
            <button
              key={index}
              className={`opcion ${
                selectedOption !== null && opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97] ? 'correct' :
                selectedOption === opcion && !isCorrect ? 'incorrect' : ''
              }`}
              onClick={() => handleOptionClick(opcion)}
              disabled={desabilitado}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      <div className="puntos-box">
        <h2>PUNTOS</h2>
        <p>{puntos}</p>
      </div>
    </div>
  );
};

export default PaginaPreguntaSolo;