import React, { useState } from 'react';
import MasterPage from './masterPage';
import '../styles/ajustes.css';

function Ajustes() {
  const [music, setMusic] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(true);

  const handleSave = () => {
   
    console.log('Guardando cambios:', { music, soundEffects, textToSpeech });
  };

  return (
    <MasterPage>
      <div className="ajustes-container">
        <h2>Ajustes</h2>
        <div className="ajustes-option">
          <input
            type="checkbox"
            checked={music}
            onChange={() => setMusic(!music)}
          />
          <label>Música</label>
        </div>
        <div className="ajustes-option">
          <input
            type="checkbox"
            checked={soundEffects}
            onChange={() => setSoundEffects(!soundEffects)}
          />
          <label>Efectos de sonido</label>
        </div>
        <div className="ajustes-option">
          <input
            type="checkbox"
            checked={textToSpeech}
            onChange={() => setTextToSpeech(!textToSpeech)}
          />
          <label>Text to speech</label>
        </div>
        <div className="divButton"><button className="save-button" onClick={handleSave}>
          Guardar cambios
        </button></div>
        
      </div>
    </MasterPage>
  );
}

export default Ajustes;

