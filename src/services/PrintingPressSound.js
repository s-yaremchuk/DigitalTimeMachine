// Web Audio API Synthesizer for printing press sound
class PrintingPressSoundController {
  constructor() {
    this.ctx = null;
    this.intervalId = null;
    this.isMuted = true; // default state
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isMuted) return;
    this.init();
    if (this.intervalId) return;

    // Rhythmic loop: clank-thump-slide
    this.intervalId = setInterval(() => {
      this.playCycle();
    }, 850);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  playCycle() {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      // User must interact first (already handled by clicking the mute button)
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    try {
      // 1. Heavy Thump (Low frequency bass drop representing the mechanical press plate hitting)
      const thumpOsc = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thumpOsc.connect(thumpGain);
      thumpGain.connect(this.ctx.destination);

      thumpOsc.frequency.setValueAtTime(65, now);
      thumpOsc.frequency.exponentialRampToValueAtTime(0.01, now + 0.35);
      thumpGain.gain.setValueAtTime(0.35, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      thumpOsc.start(now);
      thumpOsc.stop(now + 0.35);

      // 2. Metallic Clank (Triangle wave high pitched transient representing gears/lever)
      const clankOsc = this.ctx.createOscillator();
      const clankGain = this.ctx.createGain();
      clankOsc.type = 'triangle';
      clankOsc.connect(clankGain);
      clankGain.connect(this.ctx.destination);

      clankOsc.frequency.setValueAtTime(450, now + 0.12);
      clankOsc.frequency.setValueAtTime(620, now + 0.18);
      clankGain.gain.setValueAtTime(0, now);
      clankGain.gain.setValueAtTime(0.08, now + 0.12);
      clankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      clankOsc.start(now);
      clankOsc.stop(now + 0.3);

      // 3. Paper Feeding slide (Filtered White Noise sweep)
      const bufferSize = this.ctx.sampleRate * 0.3; // 300ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(800, now + 0.2);
      bandpass.frequency.exponentialRampToValueAtTime(1400, now + 0.5);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.setValueAtTime(0.02, now + 0.2);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noiseSource.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseSource.start(now + 0.2);
      noiseSource.stop(now + 0.55);
    } catch (e) {
      console.warn("Audio cycle error", e);
    }
  }
}

export const printingPressSound = new PrintingPressSoundController();
