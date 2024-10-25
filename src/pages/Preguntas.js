import React from 'react';
import MasterPage from './masterPage'; // Ajusta la ruta según la ubicación del archivo.
import '../styles/Preguntas.css'; // Asegúrate de que los estilos estén en este archivo.

const PaginaPregunta = () => {
  return (
    <MasterPage>
      <div className="juego-container">
        <div className="turno-box">
          <h2>ES TU TURNO!</h2>
        </div>
        <div className="pregunta-box">
          <div className="pregunta">
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisl maecenas vitae ornare mi porttitor ridiculus. Leo
              pellentesque porta libero sagittis viverra mi ultricies enim.
            </p>
          </div>
          <div className="opciones">
            <button className="opcion incorrecta">Luis Suarez</button>
            <button className="opcion correcta">Marcelo Danubio Zalayeta</button>
            <button className="opcion">Antonio Pacheco</button>
            <button className="opcion">Hector Scarone</button>
          </div>
        </div>
        <div className="puntos-box">
          <h2>PUNTOS</h2>
          <p>500</p>
        </div>
      </div>
    </MasterPage>
  );
};

export default PaginaPregunta;
