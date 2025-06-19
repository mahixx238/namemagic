let loveShown = false;
let clickCount = 0;

function startLove() {
  if (loveShown) return;

  const container = document.createElement('div');
  container.className = 'love-container';
  container.innerHTML = '❤️';
  document.body.appendChild(container);

  const n = document.createElement('div');
  n.className = 'letter-n';
  n.innerHTML = 'M';
  container.appendChild(n);

  n.addEventListener('click', () => handleNClick(n));

  loveShown = true;
}

function handleNClick(n) {
  clickCount++;

  if (clickCount === 1) {
    launchFireworks('default');
  } else if (clickCount === 2) {
    n.classList.add('color-1');
    launchFireworks('cool');
  } else if (clickCount === 3) {
    n.classList.remove('color-1');
    n.classList.add('color-2');
    launchFireworks('hot');
  } else if (clickCount === 4) {
    showName();
  }
}

function showName() {
  const name = document.createElement('div');
  name.className = 'full-name';
  name.innerHTML = 'MD. MAHI';
  document.body.appendChild(name);
}

function launchFireworks(style = 'default') {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = {
    default: ['#ff0000', '#ff9900', '#ffff00'],
    cool: ['#00ffff', '#6600ff', '#cc66ff'],
    hot: ['#00ff00', '#0000ff', '#ffff00']
  };

  const selected = colors[style] || colors.default;

  const particles = [];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < 150; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    particles.push({
      x: centerX,
      y: centerY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: 100,
      radius: Math.random() * 3 + 2,
      color: selected[Math.floor(Math.random() * selected.length)]
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
    });

    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
