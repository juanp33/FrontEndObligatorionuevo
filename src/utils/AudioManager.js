
class AudioManager {
    constructor() {
      this.audioFiles = {
        musicaMenu: new Audio(require('../sound/musicaMenu.mp3')),
    musicaPregunta: new Audio(require('../sound/musicaPregunta.mp3')),
    musicaRuleta: new Audio(require('../sound/musicaRuleta.mp3')),
    correcto: new Audio(require('../sound/correcto.mp3')),
    incorrecto: new Audio(require('../sound/incorrecto.mp3')),
      };
  
      this.isMusicEnabled = true;
      this.isSoundEffectsEnabled = true;
  
      // Configurar música en bucle
      this.audioFiles.musicaMenu.loop = true;
      this.audioFiles.musicaPregunta.loop = true;
      this.audioFiles.musicaRuleta.loop = true;
    }
  
    toggleMusic(enabled) {
      this.isMusicEnabled = enabled;
      if (!enabled) {
        this.pauseAllMusic();
      }
    }
  
    toggleSoundEffects(enabled) {
      this.isSoundEffectsEnabled = enabled;
    }
  
    playMusic(type) {
      if (this.isMusicEnabled && this.audioFiles[type]) {
        this.audioFiles[type].play().catch((error) => {
          console.error(`Error al reproducir música ${type}:`, error);
        });
      }
    }
  
    pauseAllMusic() {
      Object.keys(this.audioFiles).forEach((key) => {
        if (key.startsWith('musica')) {
          this.audioFiles[key].pause();
          this.audioFiles[key].currentTime = 0;
        }
      });
    }
  
    playSoundEffect(type) {
      if (this.isSoundEffectsEnabled && this.audioFiles[type]) {
        this.audioFiles[type].play().catch((error) => {
          console.error(`Error al reproducir efecto de sonido ${type}:`, error);
        });
      }
    }
  }
  
  const audioManager = new AudioManager();
  export default audioManager;