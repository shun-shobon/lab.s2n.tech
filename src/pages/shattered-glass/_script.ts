import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { range } from "~/utils/range";

import skyboxBack from "./_assets/skybox-back.png";
import skyboxBottom from "./_assets/skybox-bottom.png";
import skyboxFront from "./_assets/skybox-front.png";
import skyboxLeft from "./_assets/skybox-left.png";
import skyboxRight from "./_assets/skybox-right.png";
import skyboxTop from "./_assets/skybox-top.png";

class Glass {
	readonly #canvas: HTMLCanvasElement;
	readonly #scene: THREE.Scene;
	readonly #camera: THREE.PerspectiveCamera;
	readonly #renderer: THREE.WebGLRenderer;
	readonly #controls: OrbitControls;
	readonly #glasses: THREE.Mesh[];

	constructor(canvas: HTMLCanvasElement, skybox: THREE.CubeTexture) {
		this.#canvas = canvas;
		this.#scene = new THREE.Scene();
		this.#scene.background = skybox;
		this.#camera = new THREE.PerspectiveCamera(
			60,
			this.#canvas.width / this.#canvas.height,
			0.1,
			1000,
		);
		this.#camera.position.z = -5;

		this.#controls = new OrbitControls(this.#camera, this.#canvas);

		this.#renderer = new THREE.WebGLRenderer({
			canvas: this.#canvas,
			antialias: true,
		});

		const envMap = skybox.clone();
		envMap.mapping = THREE.CubeRefractionMapping;

		const material = new THREE.MeshBasicMaterial({
			color: 0x88_88_88,
			envMap,
			refractionRatio: 0.9,
			reflectivity: 0.95,
		});

		this.#glasses = range(0, 30).map(() => {
			const geometry = new THREE.TetrahedronGeometry();
			const mesh = new THREE.Mesh(geometry, material);

			mesh.rotation.x = Math.random() * Math.PI * 2;
			mesh.rotation.y = Math.random() * Math.PI * 2;
			mesh.rotation.z = Math.random() * Math.PI * 2;

			mesh.position.x = ((Math.random() + Math.random()) / 2) * 10 - 5;
			mesh.position.y = Math.random() * 20 - 10;
			mesh.position.z = Math.random() * 10 - 3;

			mesh.scale.x = Math.random() * 0.5 + 0.2;
			mesh.scale.y = Math.random() * 0.5 + 0.2;
			mesh.scale.z = Math.random() * 0.5 + 0.2;

			return mesh;
		});

		this.#glasses.forEach((glass) => {
			this.#scene.add(glass);
		});

		this.#resize();

		window.addEventListener("resize", this.#resize.bind(this));
	}

	run() {
		this.#animate();
	}

	#resize() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		this.#renderer.setPixelRatio(window.devicePixelRatio);
		this.#renderer.setSize(width, height);

		this.#camera.aspect = width / height;
		this.#camera.updateProjectionMatrix();
	}

	#animate() {
		requestAnimationFrame(this.#animate.bind(this));

		this.#controls.update();

		this.#glasses.forEach((glass) => {
			glass.position.y += 0.005;

			glass.rotation.x += 0.001;
			glass.rotation.y += 0.001;

			if (glass.position.y > 10) {
				glass.position.x = ((Math.random() + Math.random()) / 2) * 10 - 5;
				glass.position.y = Math.random() * 3 - 10;
				glass.position.z = Math.random() * 10 - 3;
			}
		});

		this.#renderer.render(this.#scene, this.#camera);
	}
}

// Skyboxのテクスチャ
// x+-、y+-、z+-の順に指定する
const urls = [
	skyboxRight.src,
	skyboxLeft.src,
	skyboxTop.src,
	skyboxBottom.src,
	skyboxFront.src,
	skyboxBack.src,
];

const skybox = await new THREE.CubeTextureLoader().loadAsync(urls);

const $canvas = document.querySelector("#canvas");
if (!$canvas) throw new Error("canvas is not found");

const glass = new Glass($canvas as HTMLCanvasElement, skybox);

glass.run();

export {};
