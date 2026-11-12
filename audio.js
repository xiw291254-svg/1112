/**
 * 光影迴廊 · Web Audio API 聲音合成引擎
 * 完全免加載外部音頻檔案，純程式即時合成氛圍音樂與空間音效
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientGain = null;
    this.sfxGain = null;
    this.isAmbientPlaying = false;
    this.ambientOscillators = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // 主 SFX 音量節點
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);

      // 背景音樂音量節點
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      this.initialized = true;
      this.startAmbientDrone();
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.sfxGain && this.ambientGain) {
      const targetGain = this.isMuted ? 0 : 1;
      this.sfxGain.gain.setTargetAtTime(targetGain * 0.4, this.ctx.currentTime, 0.05);
      this.ambientGain.gain.setTargetAtTime(targetGain * 0.2, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  /**
   * 播放神秘空靈的背景無調和弦 (Ambient Drone Pad)
   */
  startAmbientDrone() {
    if (!this.ctx || this.isAmbientPlaying || this.isMuted) return;
    this.isAmbientPlaying = true;

    // 神秘調和頻率群 (C Minor / Dorian: C3, G3, D#4, A#4)
    const baseFreqs = [130.81, 196.00, 311.13, 466.16];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // 低通濾波營造深邃空間感
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, this.ctx.currentTime);

      // LFO 微調音量或頻率產生呼吸律動
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(15, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      if (panner) {
        panner.pan.setValueAtTime((idx - 1.5) * 0.5, this.ctx.currentTime);
        osc.connect(filter);
        filter.connect(panner);
        panner.connect(this.ambientGain);
      } else {
        osc.connect(filter);
        filter.connect(this.ambientGain);
      }

      osc.start();
      this.ambientOscillators.push(osc, lfo);
    });
  }

  /**
   * 左右切換房間時的空間過渡風聲 (Whoosh with stereo pan)
   * @param {number} direction -1 代表向左, 1 代表向右
   */
  playRoomWhoosh(direction = 1) {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const dur = 0.55;

    // 白噪音緩衝區
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3.5, now);
    filter.frequency.setValueAtTime(direction > 0 ? 300 : 900, now);
    filter.frequency.exponentialRampToValueAtTime(direction > 0 ? 1200 : 250, now + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) {
      panner.pan.setValueAtTime(direction * -0.8, now);
      panner.pan.linearRampToValueAtTime(direction * 0.8, now + dur);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(this.sfxGain);
    } else {
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
    }

    noise.start(now);
  }

  /**
   * 旋轉鏡子 / 稜鏡點擊聲 (Prism Click)
   */
  playPrismRotate() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * 齒輪棘輪轉動聲 (Gear Clack)
   */
  playGearTurn() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < 2; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const offset = i * 0.04;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + i * 150, now + offset);
      osc.frequency.exponentialRampToValueAtTime(150, now + offset + 0.05);

      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + offset);
      osc.stop(now + offset + 0.05);
    }
  }

  /**
   * 星辰連線鐘琴聲 (Starlight Chime)
   * @param {number} pitchIndex 音高階梯 (0 ~ 5)
   */
  playStarChime(pitchIndex = 0) {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // 仙境五聲音階
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const freq = scale[pitchIndex % scale.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  /**
   * 成功解開房間謎題的昇華神聖和弦 (Seal Unlocked Harmony)
   */
  playPuzzleSolved() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // 大七和弦琶音 C - E - G - B - D - G
    const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.35, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + delay);
      osc.stop(now + delay + 1.2);
    });
  }

  /**
   * 通關超維昇華大交響 (Victory Fanfare)
   */
  playVictoryFanfare() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    const chords = [
      [523.25, 659.25, 783.99],       // C
      [587.33, 739.99, 880.00],       // D
      [659.25, 830.61, 987.77],       // E
      [783.99, 1046.50, 1318.51, 1567.98] // Grand C High
    ];

    chords.forEach((chord, cIdx) => {
      const chordTime = now + cIdx * 0.45;
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = cIdx === 3 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, chordTime);

        gain.gain.setValueAtTime(0.01, chordTime);
        gain.gain.linearRampToValueAtTime(0.3, chordTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + (cIdx === 3 ? 2.5 : 0.6));

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(chordTime);
        osc.stop(chordTime + (cIdx === 3 ? 2.5 : 0.6));
      });
    });
  }
}

// 全局音效單例
window.soundEngine = new SoundEngine();
