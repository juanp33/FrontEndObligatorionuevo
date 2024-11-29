class TextToSpeechManager {
    constructor() {
      this.synth = window.speechSynthesis;
      this.isEnabled = true; // Por defecto está habilitado
      this.voice = null;
  
      // Cargar la voz predeterminada
      this.synth.onvoiceschanged = () => {
        const voices = this.synth.getVoices();
        this.voice = voices.find((v) => v.lang === 'es-ES') || voices[0];
      };
    }
  
    toggleTextToSpeech(enabled) {
      this.isEnabled = enabled;
    }
  
    speak(text) {
      if (this.isEnabled && this.synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) {
          utterance.voice = this.voice;
        }
        utterance.lang = 'es-ES';
        this.synth.speak(utterance);
      }
    }
  
    stop() {
      if (this.synth.speaking) {
        this.synth.cancel();
      }
    }
  }
  
  const textToSpeechManager = new TextToSpeechManager();
  export default textToSpeechManager;