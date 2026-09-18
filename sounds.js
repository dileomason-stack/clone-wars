(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, frequency, start, duration, type, volume, endFrequency) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  window.SOUNDS = {
    flap() {
      try {
        const context = getAudio();
        if (!context) return;
        tone(context, 520, context.currentTime, 0.16, 'triangle', 0.12, 760);
      } catch (error) {}
    },
    score() {
      try {
        const context = getAudio();
        if (!context) return;
        tone(context, 740, context.currentTime, 0.12, 'sine', 0.12, 1040);
        tone(context, 1040, context.currentTime + 0.08, 0.15, 'sine', 0.1, 1240);
      } catch (error) {}
    },
    crash() {
      try {
        const context = getAudio();
        if (!context) return;
        tone(context, 210, context.currentTime, 0.28, 'sawtooth', 0.14, 70);
        tone(context, 120, context.currentTime, 0.3, 'square', 0.08, 55);
      } catch (error) {}
    }
  };
})();
