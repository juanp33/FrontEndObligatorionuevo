import React, { useEffect, useState, useRef } from 'react';
import '../styles/Preguntas.css';
import useWebSocket from '../utils/UseWebSocket';
import audioManager from '../utils/AudioManager'; 

const PaginaPregunta = ({ preguntaData, onAnswer, desabilitado, lobbyId, onPuntosTemporales, turno }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const { client, lobbyMessages } = useWebSocket(lobbyId);
  const [puntosTemporales, setPuntosTemporales] = useState(600);
  const intervalRef = useRef(null);
  const [processedMessage, setProcessedMessage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false); 

  useEffect(() => {
    audioManager.playMusic('musicaPregunta');

    return () => {
      audioManager.pauseAllMusic('musicaPregunta');
    };
  }, []);

  const handleOptionClick = (opcion) => {
    if (processedMessage) return;

    setProcessedMessage(true);
    setIsDisabled(true); 

    if (!desabilitado) {
      client.send(`/app/respuestaCorrecta/${lobbyId}`, {}, JSON.stringify({
        opcion: opcion,
        tipo: "opcion",
      }));
    }

    const acierto = opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97];
    setSelectedOption(opcion);
    setIsCorrect(acierto);

    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    
    if (onPuntosTemporales) {
      console.log("Enviando puntos temporales:", puntosTemporales);
      onPuntosTemporales(acierto ? puntosTemporales : 0);
    }

    
    if (acierto && puntosTemporales !== 0) {
      audioManager.playSoundEffect('correcto');
    } else {
      audioManager.playSoundEffect('incorrecto');
    }

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setIsCorrect(null);
      setPuntosTemporales(600);
      setProcessedMessage(null);
      setIsDisabled(false); 
    }, 5000);
  };

  useEffect(() => {
    if (lobbyMessages.length > 0 && desabilitado) {
      try {
        const latestMessage = JSON.parse(lobbyMessages[lobbyMessages.length - 1]);
        if (latestMessage.tipo === "opcion") {
          handleOptionClick(latestMessage.opcion);
        }
      } catch (error) {
        console.error("Error procesando mensaje del lobby:", error);
      }
    }
  }, [client, lobbyMessages]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPuntosTemporales((prevPuntos) => Math.max(prevPuntos - 1, 0));
    }, 107);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [preguntaData]); 

  useEffect(() => {
    if (puntosTemporales === 0 && selectedOption === null) {
      const opcionCorrecta = preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97];
      handleOptionClick(opcionCorrecta);
    }
  }, [puntosTemporales, preguntaData, selectedOption]);

  return (
    <div className="juego-container">
      <div className="turno-box">
        {desabilitado ? "ES EL TURNO DEL RIVAL!" : "ES TU TURNO!"}
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
                selectedOption !== null &&
                opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97]
                  ? 'correct'
                  : selectedOption === opcion && !isCorrect
                  ? 'incorrect'
                  : ''
              }`}
              onClick={() => handleOptionClick(opcion)}
              disabled={desabilitado || isDisabled} 
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      <div className="puntos-box">
        <h2>PUNTOS</h2>
        <p>{puntosTemporales}</p>
      </div>
    </div>
  );
};

export default PaginaPregunta;
