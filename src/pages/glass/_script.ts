import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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
	readonly #torus: THREE.Mesh;

	constructor(canvas: HTMLCanvasElement, skybox: THREE.CubeTexture) {
		this.#canvas = canvas;
		this.#scene = new THREE.Scene();
		this.#scene.background = skybox;
		this.#camera = new THREE.PerspectiveCamera(
			75,
			this.#canvas.width / this.#canvas.height,
			0.1,
			1000,
		);
		this.#camera.position.z = -5;

		this.#controls = new OrbitControls(this.#camera, this.#canvas);
		this.#controls.autoRotate = true;

		this.#renderer = new THREE.WebGLRenderer({
			canvas: this.#canvas,
			antialias: true,
		});

		const envMap = skybox.clone();
		// CubeRefractionMappingにするとガラスのような透過効果が出る
		// デフォルトはCubeReflectionMapping(反射のみ)
		envMap.mapping = THREE.CubeRefractionMapping;
		const geometry = new THREE.TorusGeometry();
		const material = new THREE.MeshBasicMaterial({
			color: 0xcc_cc_cc,
			envMap,
			// 屈折率
			refractionRatio: 0.4,
			// 反射率(低くすると元の色が見える)
			reflectivity: 0.9,
		});
		this.#torus = new THREE.Mesh(geometry, material);
		this.#scene.add(this.#torus);

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

		this.#torus.rotation.x += 0.01;
		this.#torus.rotation.y += 0.01;

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

// eslint-disable-next-line typescript/non-nullable-type-assertion-style
const canvas = document.querySelector("#canvas");
const glass = new Glass(canvas, skybox);

glass.run();

export {};
