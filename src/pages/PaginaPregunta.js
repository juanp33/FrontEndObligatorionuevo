import React, { useEffect, useState , useRef } from 'react';
import '../styles/Preguntas.css';
import useWebSocket from './UseWebSocket';

const PaginaPregunta = ({ preguntaData, onAnswer, desabilitado, lobbyId, onPuntosTemporales}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const { client, lobbyMessages } = useWebSocket(lobbyId);
  const [puntosTemporales, setPuntosTemporales] = useState(600);
  const intervalRef = useRef(null); // Referencia para el intervalo
  const [processedMessage, setProcessedMessage] = useState(null);

  const handleOptionClick = (opcion) => {

    if (processedMessage) return;

    setProcessedMessage(true);

    if(!desabilitado){
      client.send(`/app/respuestaCorrecta/${lobbyId}`, {}, JSON.stringify({
        opcion: opcion,
        tipo:"opcion"
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
      console.log("Enviando puntos temporales:", puntosTemporales); // Para depuración
     if(acierto) {
      
      onPuntosTemporales(puntosTemporales); 

     }else{
      onPuntosTemporales(0); 
     }

     // Llama a la función de prop
    }

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setIsCorrect(null);
      setPuntosTemporales(600);
      setProcessedMessage(null);
    }, 5000);
  };

  useEffect(() => {
    if (lobbyMessages.length > 0 && desabilitado ) {
      try {
        const latestMessage = JSON.parse(lobbyMessages[lobbyMessages.length - 1]);
        if (latestMessage.tipo === "opcion" ) {
          handleOptionClick(latestMessage.opcion); 
        }
      }catch(error){

      }
    }
    
  }, [client,lobbyMessages]);

  useEffect(() => {
    // Configura el temporizador para disminuir los puntos
    intervalRef.current = setInterval(() => {
      setPuntosTemporales((prevPuntos) => Math.max(prevPuntos - 1, 0)); // Asegura que no baje de 0
    }, 100);

    return () => {
      // Limpia el intervalo al desmontar o cambiar de pregunta
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [preguntaData]);  // Se reinicia el temporizador al cambiar de pregunta

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
                selectedOption !== null &&
                opcion === preguntaData.respuestas[preguntaData.respuestaCorrecta.charCodeAt(0) - 97]
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
        <p>{puntosTemporales}</p>
      </div>
    </div>
  );
};

export default PaginaPregunta;