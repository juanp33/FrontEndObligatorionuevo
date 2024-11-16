import React, { useEffect, useState } from 'react';
import '../styles/Preguntas.css';
import useWebSocket from './UseWebSocket';

const PaginaPregunta = ({ preguntaData, onAnswer, puntos,desabilitado, lobbyId}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const { client, lobbyMessages } = useWebSocket(lobbyId);

  const handleOptionClick = (opcion) => {
    client.send(`/app/respuestaCorrecta/${lobbyId}`, {}, JSON.stringify({
      opcion: opcion,
      tipo:"opcion"
    }));
    const acierto = opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97];
    setSelectedOption(opcion);
    setIsCorrect(acierto);
    setTimeout(() => {
      onAnswer(acierto);
      setSelectedOption(null);
      setIsCorrect(null);
    }, 3000);
  };

  useEffect(() => {
    if (lobbyMessages.length > 0 && desabilitado ) {
      try {
        const latestMessage = JSON.parse(lobbyMessages[lobbyMessages.length - 1]);
        if (latestMessage.tipo === "opcion" ) {
          handleOptionClick(latestMessage.opcion); // Manejar la opción
        }
      }catch(error){

      }
    }
    
  }, [lobbyMessages]);

  return (
    <div className="juego-container">
      <div className="turno-box">
        <h2>ES TU TURNO!</h2>
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

export default PaginaPregunta;