import React, { useState, useEffect } from "react";
import MasterPage from "./masterPage";
import "../styles/ranking.css";

const Ranking = () => {
  const [players, setPlayers] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("victorias");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jugadores/detalles");
        const data = await response.json();
        if (Array.isArray(data)) {
          setPlayers(data);
        } else {
          console.error("La respuesta del backend no es un arreglo:", data);
          setPlayers([]);
        }
      } catch (error) {
        console.error("Error al obtener jugadores:", error);
        setPlayers([]);
      }
    };
    fetchPlayers();
  }, []);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const getSortedPlayers = () => {
    if (!players || players.length === 0) return [];
    return [...players].sort((a, b) => {
      if (sortCriteria === "victorias") {
        return b.partidasGanadas - a.partidasGanadas;
      }
      if (sortCriteria === "singleplayer") {
        return b.puntajeMaximoSP - a.puntajeMaximoSP;
      }
      if (sortCriteria === "derrotas") {
        return b.partidasPerdidas - a.partidasPerdidas;
      }
      return 0;
    });
  };

  const sortedPlayers = getSortedPlayers(); 

  return (
    <MasterPage>
      <div className="ranking-container">
        <div className="filter-container">
          <label htmlFor="sort">Ordenar por:</label>
          <select
            id="sort"
            className="dropdown"
            value={sortCriteria}
            onChange={handleSortChange}
          >
            <option value="victorias">Victorias</option>
            <option value="singleplayer">Singleplayer</option>
            <option value="derrotas">Derrotas</option>
          </select>
        </div>
        <div className="player-table">
          <div className="table-header">
            <div className="table-cell">Nombre</div>
            <div className="table-cell">Singleplayer</div>
            <div className="table-cell">Victorias</div>
            <div className="table-cell">Derrotas</div>
          </div>
          {sortedPlayers.map((player, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{player.username}</div>
              <div className="table-cell">{player.puntajeMaximoSP}</div>
              <div className="table-cell">{player.partidasGanadas}</div>
              <div className="table-cell">{player.partidasPerdidas}</div>
            </div>
          ))}
        </div>
      </div>
    </MasterPage>
  );
};

export default Ranking;
