import React, { useState, useEffect } from 'react';
import MasterPage from './masterPage';
import audioManager from '../utils/AudioManager';
import textToSpeechManager from '../utils/TextToSpeechManager';

function Ajustes() {
  const [music, setMusic] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(true);

  useEffect(() => {
    const savedMusic = localStorage.getItem('music') === 'true';
    const savedSoundEffects = localStorage.getItem('soundEffects') === 'true';
    const savedTextToSpeech = localStorage.getItem('textToSpeech') === 'true';

    setMusic(savedMusic);
    setSoundEffects(savedSoundEffects);
    setTextToSpeech(savedTextToSpeech);

    // Configurar estados iniciales
    audioManager.toggleMusic(savedMusic);
    audioManager.toggleSoundEffects(savedSoundEffects);
    textToSpeechManager.toggleTextToSpeech(savedTextToSpeech);
  }, []);

  const handleSave = () => {
    localStorage.setItem('music', music);
    localStorage.setItem('soundEffects', soundEffects);
    localStorage.setItem('textToSpeech', textToSpeech);

    audioManager.toggleMusic(music);
    audioManager.toggleSoundEffects(soundEffects);
    textToSpeechManager.toggleTextToSpeech(textToSpeech);

    alert('Configuraciones guardadas correctamente');
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
          <label>Text-to-Speech</label>
        </div>
        <button onClick={handleSave}>Guardar cambios</button>
      </div>
    </MasterPage>
  );
}

export default Ajustes;