// =============================================
//  script.js — Candle Blow Logic & Particles
// =============================================

let clickCount = 0;
const TOTAL_CANDLES = 3;

// ===== INIT STARS =====
function initStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.classList.add('star');
    const size = 1.5 + Math.random() * 3;
    s.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    container.appendChild(s);
  }
}

// ===== INIT FLOATING PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#f5c518', '#d62828', '#f4845f', '#4ecdc4', '#fff8f0'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = 4 + Math.random() * 8;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}vw;
      bottom: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

// ===== BLOW CANDLE =====
function blowCandle() {
  if (clickCount >= TOTAL_CANDLES) return;

  clickCount++;

  // Blow the current candle
  const flame = document.getElementById('f' + clickCount);
  if (flame) {
    flame.classList.add('blown');
    spawnSmoke(flame);
  }

  // Pop rings
  triggerRings();

  // Play click sound (Web Audio API — no file needed)
  playPuff();

  // Update hint text
  updateHint();

  // Dim the glow progressively
  const glow = document.getElementById('cakeGlow');
  if (glow) {
    glow.style.opacity = String(1 - clickCount / TOTAL_CANDLES);
  }

  // All candles blown
  if (clickCount >= TOTAL_CANDLES) {
    setTimeout(showOpenButton, 800);
  }
}

// ===== SMOKE PUFF =====
function spawnSmoke(flameEl) {
  const rect = flameEl.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const smoke = document.createElement('div');
    smoke.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top}px;
      width: ${10 + Math.random() * 12}px;
      height: ${10 + Math.random() * 12}px;
      background: rgba(200,200,200,${0.3 + Math.random() * 0.3});
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      animation: smoke-rise 1s ease-out forwards;
      animation-delay: ${i * 0.08}s;
    `;
    document.body.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1200);
  }

  // Inject smoke keyframes once
  if (!document.getElementById('smoke-style')) {
    const style = document.createElement('style');
    style.id = 'smoke-style';
    style.textContent = `
      @keyframes smoke-rise {
        0%   { transform: translateY(0) scale(1); opacity: .6; }
        100% { transform: translateY(-60px) scale(2.5) translateX(${(Math.random()-.5)*30}px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== RING ANIMATION =====
function triggerRings() {
  ['ring1','ring2','ring3'].forEach((id, i) => {
    const r = document.getElementById(id);
    if (!r) return;
    r.classList.remove('pop');
    void r.offsetWidth; // reflow
    setTimeout(() => r.classList.add('pop'), i * 80);
  });
}

// ===== UPDATE HINT TEXT =====
function updateHint() {
  const hint = document.getElementById('hintText');
  if (!hint) return;
  const messages = [
    '🕯️ 2 lilin lagi...',
    '🕯️ 1 lilin lagi...',
    '🎉 Semua lilin padam! Yay!'
  ];
  hint.textContent = messages[clickCount - 1];
}

// ===== SHOW OPEN BUTTON =====
function showOpenButton() {
  const wrap = document.getElementById('openBtnWrap');
  if (wrap) wrap.classList.add('show');
}

// ===== AUDIO — Puff sound via Web Audio =====
function playPuff() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    src.connect(gain); gain.connect(ctx.destination);
    src.start();
  } catch (e) { /* silent fail */ }
}

// ===== BACKGROUND MUSIC =====
function startBgMusic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Simple cheerful melody using Web Audio oscillators
    const notes = [261.63, 329.63, 392, 523.25, 392, 329.63, 261.63];
    const durations = [0.3, 0.3, 0.3, 0.6, 0.3, 0.3, 0.6];
    let time = ctx.currentTime + 0.5;
    function playMelody() {
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
        gain.gain.linearRampToValueAtTime(0, time + durations[i] - 0.02);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(time); osc.stop(time + durations[i]);
        time += durations[i];
      });
      time += 0.5;
    }
    // Play 3 loops
    for (let loop = 0; loop < 3; loop++) playMelody();
  } catch (e) { /* silent fail */ }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParticles();

  // Start music on first user interaction
  document.addEventListener('click', () => {
    if (!window._musicStarted) {
      window._musicStarted = true;
      startBgMusic();
    }
  }, { once: true });
});
