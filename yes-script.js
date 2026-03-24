// =============================================
//  yes-script.js — Konfeti & Reveal Pesan
// =============================================

const CONFETTI_COLORS = [
  '#f5c518','#d62828','#f4845f','#4ecdc4',
  '#fff8f0','#ffd700','#ff6b6b','#a8edea',
  '#0d3b6e','#c9950a'
];

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

// ===== CONFETTI =====
function launchConfetti(count = 150) {
  const container = document.getElementById('confettiContainer') || document.body;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.classList.add('confetti-piece');

      const size   = 8 + Math.random() * 14;
      const dur    = 2 + Math.random() * 2.5;
      const dx     = (Math.random() - 0.5) * 200;
      const isCirc = Math.random() > 0.4;
      const isRibb = Math.random() > 0.7;

      c.style.cssText = `
        left: ${10 + Math.random() * 80}vw;
        top: -5vh;
        width: ${isRibb ? 4 : size}px;
        height: ${isRibb ? size * 2.5 : size}px;
        background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
        border-radius: ${isCirc ? '50%' : isRibb ? '2px' : '2px'};
        --dx: ${dx}px;
        animation-duration: ${dur}s;
        animation-delay: ${i * 0.012}s;
        opacity: 1;
      `;
      container.appendChild(c);
      setTimeout(() => c.remove(), (dur + 0.2 + i * 0.012) * 1000);
    }, i * 8);
  }
}

// ===== SCROLL REVEAL =====
function setupReveal() {
  const items = document.querySelectorAll('.reveal-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.18}s`;
    observer.observe(item);
  });
}

// ===== BIRTHDAY MUSIC =====
function playBirthdayMusic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // "Happy Birthday" simplified melody
    const melody = [
      [261.63, 0.25], [261.63, 0.25], [293.66, 0.5], [261.63, 0.5],
      [349.23, 0.5],  [329.63, 1.0],
      [261.63, 0.25], [261.63, 0.25], [293.66, 0.5], [261.63, 0.5],
      [392.00, 0.5],  [349.23, 1.0],
      [261.63, 0.25], [261.63, 0.25], [523.25, 0.5], [440.00, 0.5],
      [349.23, 0.5],  [329.63, 0.5],  [293.66, 1.0],
      [466.16, 0.25], [466.16, 0.25], [440.00, 0.5], [349.23, 0.5],
      [392.00, 0.5],  [349.23, 1.5],
    ];

    // Simple chord pad under melody
    const chords = [
      [261.63, 329.63, 392.00],
      [349.23, 440.00, 523.25],
      [392.00, 493.88, 587.33],
    ];

    let time = ctx.currentTime + 0.3;

    // Chord pads (soft, background)
    chords.forEach((chord, ci) => {
      chord.forEach(freq => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, time + ci * 2.4);
        gain.gain.linearRampToValueAtTime(0.04, time + ci * 2.4 + 0.1);
        gain.gain.linearRampToValueAtTime(0, time + ci * 2.4 + 2.3);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(time + ci * 2.4);
        osc.stop(time + ci * 2.4 + 2.4);
      });
    });

    // Melody (two passes)
    for (let pass = 0; pass < 2; pass++) {
      let t = time + (pass === 1 ? melody.reduce((a, n) => a + n[1], 0) + 0.5 : 0);
      melody.forEach(([freq, dur]) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
        gain.gain.linearRampToValueAtTime(0.08, t + dur * 0.7);
        gain.gain.linearRampToValueAtTime(0, t + dur - 0.03);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(t); osc.stop(t + dur);
        t += dur;
      });
    }

    // Little bell sparkle on top
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, time + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.07, time + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.12 + 0.6);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(time + i * 0.12);
      osc.stop(time + i * 0.12 + 0.65);
    });

  } catch (e) { /* silent fail */ }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initStars();

  // Confetti burst on load
  setTimeout(() => launchConfetti(180), 200);

  // Reveal items
  setupReveal();

  // Music after short delay
  setTimeout(playBirthdayMusic, 500);
});

// expose for button
window.launchConfetti = () => launchConfetti(160);
