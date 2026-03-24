// =============================================
//  yes-script.js — FINAL (Confetti + Reveal + Typewriter)
// =============================================

const CONFETTI_COLORS = [
  '#f5c518','#d62828','#f4845f','#4ecdc4',
  '#fff8f0','#ffd700','#ff6b6b','#a8edea',
  '#0d3b6e','#c9950a'
];

// ===== MESSAGE (TYPEWRITER) =====
const message = `
Dear kak Miranda,

Selamat ulang tahun ya kak 🎂✨

Di lautan Grand Line RSIAAZ ini,
jujur saja, jarang banget aku ketemu orang seperti kakak —
yang benar-benar baik, soft, sabar,
dan punya hati yang sangat peka terhadap orang lain.

Aku sangat berterima kasih,
karena kakak mau mendengarkan aku,
dengan seluruh cerita hidupku.
Di saat aku lagi down,
kakak hadir, mendengarkan tanpa menghakimi,
dan mengulurkan tangan dengan tulus.

Terima kasih ya kak,
sudah membantu dengan hati yang benar-benar baik.

Aku doakan kakak selalu dikelilingi
hal-hal baik dan manis 🌊
Semoga rencana kakak melanjutkan pendidikan tahun ini
dimudahkan,
dan dipertemukan dengan lingkungan yang baik.

— Dari nakama yang bersyukur kenal kakak 💛 (nasrah)
`;

let i = 0;

// ===== TYPEWRITER EFFECT =====
function startTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  function type() {
    if (i < message.length) {
      el.innerHTML += message.charAt(i);
      i++;
      setTimeout(type, 28);
    }
  }

  type();
}

// ===== INIT STARS =====
function initStars() {
  const container = document.getElementById('stars');
  if (!container) return;

  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.classList.add('star');

    const size = 1.5 + Math.random() * 3;

    s.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}vw;
      top:${Math.random()*100}vh;
      animation-delay:${Math.random()*4}s;
      animation-duration:${2+Math.random()*3}s;
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

      const size = 8 + Math.random() * 14;
      const dur  = 2 + Math.random() * 2.5;
      const dx   = (Math.random() - 0.5) * 200;
      const isCirc = Math.random() > 0.4;
      const isRibb = Math.random() > 0.7;

      c.style.cssText = `
        left:${10 + Math.random()*80}vw;
        top:-5vh;
        width:${isRibb ? 4 : size}px;
        height:${isRibb ? size*2.5 : size}px;
        background:${CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)]};
        border-radius:${isCirc ? '50%' : '2px'};
        --dx:${dx}px;
        animation-duration:${dur}s;
        animation-delay:${i*0.012}s;
      `;

      container.appendChild(c);
      setTimeout(() => c.remove(), (dur + 0.3) * 1000);

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

// ===== MUSIC =====
function playBirthdayMusic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [261.63,329.63,392,523.25,392,329.63,261.63];
    const durations = [0.3,0.3,0.3,0.6,0.3,0.3,0.6];

    let time = ctx.currentTime + 0.3;

    notes.forEach((freq,i)=>{
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.1, time + 0.03);
      gain.gain.linearRampToValueAtTime(0, time + durations[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + durations[i]);

      time += durations[i];
    });

  } catch {}
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {

  initStars();

  // 🎉 confetti awal
  setTimeout(() => launchConfetti(180), 200);

  // 👀 reveal scroll
  setupReveal();

  // 🎵 musik
  setTimeout(playBirthdayMusic, 500);

  // 📜 typewriter (delay biar cinematic)
  setTimeout(startTyping, 900);

});

// expose
window.launchConfetti = () => launchConfetti(160);
