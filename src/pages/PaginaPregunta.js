// PaginaPregunta.js
import React from 'react';
import '../styles/Preguntas.css';

const PaginaPregunta = ({ preguntaData, onAnswer, puntos }) => {
  // Extracción de la respuesta correcta (sin el prefijo "a) " o "b) ")
  const respuestaCorrecta = preguntaData.respuestaCorrecta.split(") ")[1];

  const handleOptionClick = (opcion) => {
    // Compara solo el texto de la opción con la respuesta correcta
    if (opcion === respuestaCorrecta) {
      onAnswer(true); // Llama a onAnswer con true si la respuesta es correcta
    } else {
      onAnswer(false); // Llama a onAnswer con false si es incorrecta
    }
  };

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
              className="opcion"
              onClick={() => handleOptionClick(opcion)}
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
