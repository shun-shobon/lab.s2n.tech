const canvas = document.getElementById("stars");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();

/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");

console.log(canvas);

for (let i = 0; i < 100; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  ctx.beginPath();
  ctx.arc(x, y, 1, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}

window.addEventListener("resize", resize);
