// eslint-disable-next-line typescript/non-nullable-type-assertion-style
const canvas = document.querySelector("#stars") as HTMLCanvasElement;
const maybeCtx = canvas.getContext("2d");
if (!maybeCtx) {
	throw new Error("No canvas context");
}
const ctx = maybeCtx;

interface Star {
	x: number;
	y: number;
	size: number;
	t: number;
	speed: number;
}

function resize() {
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;
}

const stars: Star[] = [];
const starCount = 400;

function createStar(): Star {
	const x = Math.random() * canvas.width;
	const y = Math.random() * canvas.height;
	const size = Math.random() * 3 + 1;
	const t = 0;
	const speed = Math.random() * 0.01 + 0.01;

	return { x, y, size, t, speed };
}

function drawStar(star: Star) {
	ctx.beginPath();
	ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(star.t)})`;
	ctx.fill();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	stars.forEach((star) => {
		drawStar(star);
	});
}

function init() {
	for (let i = 0; i < starCount; i += 1) {
		stars.push(createStar());
	}
}

window.addEventListener("resize", resize);
resize();
init();

function loop() {
	draw();

	stars.forEach((star, idx) => {
		star.t += star.speed;

		if (star.t > Math.PI) {
			stars[idx] = createStar();
		}
	});

	requestAnimationFrame(loop);
}
loop();

export {};
