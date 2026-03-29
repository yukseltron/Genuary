const P = Array.from({length: 256}, (_, i) => i);
for (let i = 255; i > 0; i--) {
  const j = (Math.random() * (i + 1)) | 0;
  [P[i], P[j]] = [P[j], P[i]];
}
const perm = [...P, ...P];

const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const lerp  = (a, b, t) => a + (b - a) * t;
const grad  = (h, x, y, z) => {
  const u = (h & 8) ? y : x;
  const v = (h & 4) ? (h & 2 ? x : z) : y;
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
};

function noise(x, y, z) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = fade(x), v = fade(y), w = fade(z);
  const A  = perm[X]   + Y, AA = perm[A]   + Z, AB = perm[A+1] + Z;
  const B  = perm[X+1] + Y, BA = perm[B]   + Z, BB = perm[B+1] + Z;
  return lerp(
    lerp(lerp(grad(perm[AA],   x,   y,   z), grad(perm[BA],   x-1, y,   z), u),
         lerp(grad(perm[AB],   x,   y-1, z), grad(perm[BB],   x-1, y-1, z), u), v),
    lerp(lerp(grad(perm[AA+1], x,   y,   z-1), grad(perm[BA+1], x-1, y,   z-1), u),
         lerp(grad(perm[AB+1], x,   y-1, z-1), grad(perm[BB+1], x-1, y-1, z-1), u), v),
    w) * 0.5 + 0.5;
}


function hslHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const hue2 = (p, q, t) => {
    t = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
    return t < 1/6 ? p + (q-p)*6*t : t < 0.5 ? q : t < 2/3 ? p + (q-p)*(2/3-t)*6 : p;
  };
  return '#' + [h + 1/3, h, h - 1/3].map(t =>
    Math.round((s === 0 ? l : hue2(p, q, t)) * 255).toString(16).padStart(2, '0')
  ).join('');
}

const CHARS = '     ·.,:;!-_=|/\\+*#@01xFfe';

const pre  = document.getElementById('c');
const COLS = Math.floor(window.innerWidth  / 9) - 1;
const ROWS = Math.floor(window.innerHeight / 17) - 1;

let t = 0;

function frame() {
  const lines = [];

  for (let r = 0; r < ROWS; r++) {
    let row = '';
    for (let c = 0; c < COLS; c++) {
      const n   = noise(c * 0.05, r * 0.07, t);
      const idx = Math.min((n * CHARS.length) | 0, CHARS.length - 1);
      row += CHARS[idx];
    }
    lines.push(`<font color="white">${row}</font>`);
  }

  pre.innerHTML = lines.join('\n');
  t += 0.018;
}

setInterval(frame, 66);
