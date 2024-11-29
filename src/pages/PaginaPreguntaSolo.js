import React, { useEffect, useState } from 'react';
import '../styles/Preguntas.css';
import iconoPerfil from '../images/iconoPerfil.png';
import audioManager from '../utils/AudioManager';
import textToSpeechManager from '../utils/TextToSpeechManager'; // Importamos el TextToSpeechManager

const PaginaPreguntaSolo = ({ preguntaData, onAnswer, puntos, desabilitado }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const username = localStorage.getItem('username');
  const textToSpeech = localStorage.getItem('textToSpeech')

  useEffect(() => {
    
    audioManager.playMusic('musicaPregunta');

    
    return () => {
      audioManager.pauseAllMusic('musicaPregunta');
    };
  }, []);

  // Llamar al TextToSpeechManager para narrar la pregunta y las opciones
  useEffect(() => {
    if (textToSpeech) {
      narrarPregunta();
    }
  }, []);

  const narrarPregunta = () => {
    const texto = `${preguntaData.enunciado}. Opciones: ${preguntaData.respuestas.join(', ')}`;
    textToSpeechManager.speak(texto);
  };

  const handleOptionClick = (opcion) => {
    const acierto = opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97];
    setSelectedOption(opcion);
    setIsCorrect(acierto);

    // Reproducir efectos de sonido
    if (acierto) {
      audioManager.playSoundEffect('correcto');
    } else {
      audioManager.playSoundEffect('incorrecto');
    }

    // Llamar a onAnswer después de un tiempo
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
                selectedOption !== null && opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97]
                  ? 'correct'
                  : selectedOption === opcion && !isCorrect
                  ? 'incorrect'
                  : ''
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