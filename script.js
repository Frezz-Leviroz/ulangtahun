const canvas = document.getElementById('loveCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.opacity = Math.random();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'pink';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size/2, this.y - this.size/2,
                      this.x + this.size*2, this.y + this.size/3,
                      this.x, this.y + this.size*2);
    ctx.bezierCurveTo(this.x - this.size*2, this.y + this.size/3,
                      this.x - this.size/2, this.y - this.size/2,
                      this.x, this.y);
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -50) {
      this.y = canvas.height + Math.random() * 100;
      this.x = Math.random() * canvas.width;
    }
  }
}

function initHearts() {
  for (let i = 0; i < 100; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

initHearts();
animate();

document.getElementById('messageBtn').addEventListener('click', () => {
  window.location.href = 'web.html'; // Pindah ke halaman message
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
