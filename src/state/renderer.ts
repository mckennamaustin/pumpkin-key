import * as THREE from 'three';
import { Target } from '../components/LandingPage/targets';

export default class Renderer {
  _camera: THREE.PerspectiveCamera;
  _scene: THREE.Scene;
  _mesh: THREE.Mesh;
  _textures: { [name: string]: THREE.Texture };

  constructor() {
    const FOV = 60;
    this._textures = {};
    this._camera = new THREE.PerspectiveCamera(
      FOV,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );

    this._scene = new THREE.Scene();
    this._mesh = new THREE.Mesh(
      new THREE.SphereGeometry(500, 60, 40),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
      })
    );
    this._mesh.scale.x = -1;

    this._scene.add(this._mesh);
  }

  public preload = (targets: Target[]): void => {
    const loader = new THREE.TextureLoader();

    targets.forEach(target => {
      this._textures[target.name] = loader.load(target.src);
    });
  };
}
