import * as THREE from '../libs/three/three.module.js';
import { OrbitControls } from '../libs/three/jsm/OrbitControls.js';

class App {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        // Camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 100);
        this.camera.position.set(0, 0, 35);

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaaaaaa);

        //  Lighting
        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
        this.scene.add(ambient);

        const light = new THREE.DirectionalLight();
        light.position.set(0.2, 1, 1);
        this.scene.add(light);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        // Reflection texture envMap
        const path = "../examples/textures/cube/SwedishRoyalCastle/";
        const format = '.jpeg';
        const urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];
        let reflectionCube = new THREE.CubeTextureLoader().load(urls);
        reflectionCube.format = THREE.RGBFormat;

        // Geometry
        const geometry = new THREE.SphereGeometry(15, 32, 16);

        // Material
        const material = new THREE.MeshStandardMaterial({
            color: 0x878787,
            emissive: 0x4F7387,
            roughness: 0.5,
            metalness: 1.0,
            flatShading: true,
            envMap: reflectionCube
        });

        // Mesh
        this.discoBall = new THREE.Mesh(geometry, material);

        this.scene.add(this.discoBall);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.discoBall.rotateY(0.01);
        this.renderer.render(this.scene, this.camera);
    }
}

export { App };