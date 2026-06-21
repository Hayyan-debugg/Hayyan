const paletteEl = document.getElementById('palette');
const cssOutput = document.getElementById('css-output');
const generateBtn = document.getElementById('generate-btn');
const lockBtn = document.getElementById('lock-btn');
const countSelect = document.getElementById('count-select');
const copyCssBtn = document.getElementById('copy-css-btn');
const toast = document.getElementById('toast');

let colors = [];
let locked = [];
let lockMode = false;

function randomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 50;
  const l = Math.floor(Math.random() * 35) + 30;
  return hslToHex(h, s, l);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getTextColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1c1917' : '#fafaf9';
}

function generatePalette() {
  const count = parseInt(countSelect.value, 10);
  const newColors = [];

  for (let i = 0; i < count; i++) {
    if (locked[i] && colors[i]) {
      newColors.push(colors[i]);
    } else {
      newColors.push(randomColor());
    }
  }

  colors = newColors;
  render();
}

function render() {
  paletteEl.innerHTML = colors.map((hex, i) => `
    <div class="color-swatch ${locked[i] ? 'locked' : ''}" data-index="${i}" style="background:${hex}; color:${getTextColor(hex)}">
      <div class="swatch-info">
        <div class="swatch-hex">${hex.toUpperCase()}</div>
        <div class="swatch-label">Click to copy</div>
      </div>
    </div>
  `).join('');

  cssOutput.textContent = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

generateBtn.addEventListener('click', generatePalette);

lockBtn.addEventListener('click', () => {
  lockMode = !lockMode;
  lockBtn.textContent = lockMode ? '🔓 Unlock Mode' : '🔒 Lock Colors';
  lockBtn.classList.toggle('btn--primary', lockMode);
});

paletteEl.addEventListener('click', e => {
  const swatch = e.target.closest('.color-swatch');
  if (!swatch) return;
  const index = parseInt(swatch.dataset.index, 10);

  if (lockMode) {
    locked[index] = !locked[index];
    render();
    return;
  }

  navigator.clipboard.writeText(colors[index].toUpperCase()).then(() => {
    showToast(`${colors[index].toUpperCase()} copied!`);
  });
});

copyCssBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(cssOutput.textContent).then(() => {
    showToast('CSS copied to clipboard!');
  });
});

countSelect.addEventListener('change', () => {
  locked = [];
  generatePalette();
});

generatePalette();
