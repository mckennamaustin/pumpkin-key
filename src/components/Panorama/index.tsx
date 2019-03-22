import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as THREE from 'three';
import bowser from 'bowser';
import clamp from '../../utils/clamp';
import { default as GenericBackButton } from './BackButton';
import Loader from 'react-loader-spinner';
import { preload } from '../LandingPage/targets';
import { DoubleSide } from 'three';
const Bowser = bowser.getParser(window.navigator.userAgent);
const Browser = Bowser.getBrowserName();

interface Props {
  src: string;
  sdSrc: string;
  goBack: () => void;
}

interface State {
  loadSize: number;
  isLoading: boolean;
}

function positionFromEvent(event: any): { clientX: number; clientY: number } {
  let { clientX, clientY } = event;

  if (event.touches && event.touches[0]) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }

  return { clientX, clientY };
}

export default class Panorama extends Component<Props, State> {
  private _canvas: HTMLCanvasElement;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.PerspectiveCamera;
  private _scene: THREE.Scene;
  private _mesh: THREE.Mesh;
  private _ldMesh: THREE.Mesh;
  private _fov: number;
  private _isInteracting: boolean;
  private _rotateStart: THREE.Vector2;
  private _rotateEnd: THREE.Vector2;
  private _rotateDelta: THREE.Vector2;

  private _rotationSpeed: number;
  private _phi: number;
  private _theta: number;
  private _animationLoop: number;
  private _shouldAnimate: boolean;
  private _count: number;
  private _sdCount: number;
  state = {
    isLoading: true,
    loadSize: 100
  };

  postLoad = () => {
    preload();
    this.setState({ isLoading: false });
  };

  increaseCount = () => {
    this._count++;

    if (this._count >= 6) {
      this._mesh.visible = true;
      setTimeout(() => {
        this._ldMesh.visible = false;
        this.setState({ isLoading: false });
      }, 500);
    }
  };

  increaseSDCount = () => {
    this._sdCount++;

    if (this._sdCount >= 6) {
      this.setState({ loadSize: 50 });
    }
  };

  componentDidMount = () => {
    this._count = 0;
    this._sdCount = 0;
    this._shouldAnimate = true;
    this._fov = 60;
    this._isInteracting = false;
    const camera = new THREE.PerspectiveCamera(
      this._fov,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );

    const scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    const spx = loader.load(`${this.props.sdSrc}-px.jpg`, this.increaseSDCount);
    const snx = loader.load(`${this.props.sdSrc}-nx.jpg`, this.increaseSDCount);
    const spy = loader.load(`${this.props.sdSrc}-py.jpg`, this.increaseSDCount);
    const sny = loader.load(`${this.props.sdSrc}-ny.jpg`, this.increaseSDCount);
    const spz = loader.load(`${this.props.sdSrc}-pz.jpg`, this.increaseSDCount);
    const snz = loader.load(`${this.props.sdSrc}-nz.jpg`, this.increaseSDCount);
    const px = loader.load(`${this.props.src}-px.jpg`, this.increaseCount);
    const nx = loader.load(`${this.props.src}-nx.jpg`, this.increaseCount);
    const py = loader.load(`${this.props.src}-py.jpg`, this.increaseCount);
    const ny = loader.load(`${this.props.src}-ny.jpg`, this.increaseCount);
    const pz = loader.load(`${this.props.src}-pz.jpg`, this.increaseCount);
    const nz = loader.load(`${this.props.src}-nz.jpg`, this.increaseCount);

    const materials = [
      new THREE.MeshBasicMaterial({
        map: px,
        side: THREE.DoubleSide
      }),
      new THREE.MeshBasicMaterial({ map: nx, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: py, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: ny, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: pz, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: nz, side: THREE.DoubleSide })
    ];

    const sdMaterials = [
      new THREE.MeshBasicMaterial({
        map: spx,
        side: THREE.DoubleSide
      }),
      new THREE.MeshBasicMaterial({ map: snx, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: spy, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: sny, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: spz, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: snz, side: THREE.DoubleSide })
    ];

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), materials);
    const ldMesh = new THREE.Mesh(
      new THREE.BoxGeometry(15, 15, 15),
      sdMaterials
    );
    mesh.visible = false;
    mesh.scale.x = -1;
    ldMesh.scale.x = -1;

    scene.add(mesh);
    scene.add(ldMesh);
    const renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    this._renderer = renderer;
    this._camera = camera;
    this._scene = scene;
    this._mesh = mesh;
    this._ldMesh = ldMesh;

    this._rotateDelta = new THREE.Vector2(0, 0);
    this._rotationSpeed = 0.25;
    this._phi = Math.PI / 2;
    this._theta = 1.7 * Math.PI;
    this.acquireListeners();
    this.animate();
  };

  componentWillUnmount = (): void => {
    cancelAnimationFrame(this._animationLoop);
    this.releaseListeners();

    this._scene.remove(this._mesh);
    this._scene.remove(this._ldMesh);
    this._renderer.dispose();
    this._mesh = null;
    this._ldMesh = null;
    this._scene = null;
    this._camera = null;
    this._renderer = null;
  };

  acquireListeners = (): void => {
    document.addEventListener('wheel', this.handleScrollWheel, false);
    document.addEventListener('mousedown', this.handleMouseDown, false);
    document.addEventListener('mousemove', this.handleMouseMove, false);
    document.addEventListener('mouseup', this.handleMouseUp, false);
    document.addEventListener('mouseleave', this.handleMouseUp, false);
    document.addEventListener('mouseout', this.handleMouseUp, false);
  };

  releaseListeners = (): void => {
    document.removeEventListener('wheel', this.handleScrollWheel);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseleave', this.handleMouseUp);
    document.removeEventListener('mouseout', this.handleMouseUp);
  };

  handleMouseUp = (): void => {
    this._isInteracting = false;
  };

  handleMouseMove = (event: any): void => {
    const { clientX, clientY } = positionFromEvent(event);

    if (this._isInteracting) {
      this._rotateEnd = new THREE.Vector2(clientX, clientY);
      this._rotateDelta
        .subVectors(this._rotateEnd, this._rotateStart)
        .multiplyScalar(this._rotationSpeed);

      const deltaTheta =
        (2 * Math.PI * this._rotateDelta.x) / window.innerWidth;
      const deltaPhi = (2 * Math.PI * this._rotateDelta.y) / window.innerHeight;

      this._phi -= deltaPhi;
      this._theta -= deltaTheta;
      this._phi = clamp(this._phi, 0.55, 2.43);
      this._rotateStart.copy(this._rotateEnd);
    }
  };

  handleMouseDown = (event: any): void => {
    this._isInteracting = true;
    const { clientX, clientY } = positionFromEvent(event);
    this._rotateStart = new THREE.Vector2(clientX, clientY);
  };

  handleScrollWheel = (event: WheelEvent): void => {
    let fov = this._fov;

    let delta = event.deltaY;
    if (Browser.toLowerCase() === 'firefox') {
      delta *= 0.5;
    } else {
      delta *= 0.5;
    }
    fov += delta;
    fov = clamp(fov, 30, 90);
    this._camera.fov = fov;
    this._camera.updateProjectionMatrix();

    this._fov = fov;
  };

  animate = (): void => {
    if (this._shouldAnimate) {
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      const phi = this._phi;
      const theta = this._theta;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      const target = new THREE.Vector3(x, y, z);
      this._camera.lookAt(target);
      this._camera.updateMatrix();

      this._renderer.render(this._scene, this._camera);

      this._animationLoop = requestAnimationFrame(this.animate);
    }
  };

  render() {
    return (
      <Container>
        <BackButton onClick={this.props.goBack} />
        {this.state.isLoading && (
          <Loader
            type="Oval"
            color="white"
            width={this.state.loadSize}
            height={this.state.loadSize}
          />
        )}
        <Canvas
          ref={canvas => {
            this._canvas = canvas;
          }}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: black;
  div:nth-of-type(1) {
    z-index: 10;
  }
`;

const BackButton = styled(GenericBackButton)`
  position: absolute;
  top: 10px;
  left: 10px;

  background-color: black;
  color: white;
  padding: 10px 20px;
  border: 1px solid white;
  outline: none;
  font-family: 'Bodoni Sans';
  font-weight: bold;
  font-size: 24px;

  cursor: pointer;
  &:hover {
    background-color: rgb(100, 100, 100);
  }
  z-index: 10;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
