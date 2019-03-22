import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as THREE from 'three';
import bowser from 'bowser';
import clamp from '../../utils/clamp';
import { default as GenericBackButton } from './BackButton';
import Loader from 'react-loader-spinner';
const Bowser = bowser.getParser(window.navigator.userAgent);
const Browser = Bowser.getBrowserName();

interface Props {
  src: string;
  goBack: () => void;
}

interface State {
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
  private _fov: number;
  private _isInteracting: boolean;
  private _rotateStart: THREE.Vector2;
  private _rotateEnd: THREE.Vector2;
  private _rotateDelta: THREE.Vector2;

  private _rotationSpeed: number;
  private _phi: number;
  private _theta: number;

  state = {
    isLoading: true
  };

  componentDidMount = () => {
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
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(500, 60, 40),
      new THREE.MeshBasicMaterial({
        map: loader.load(this.props.src, () => {
          this.setState({ isLoading: false });
        }),
        side: THREE.DoubleSide
      })
    );
    mesh.scale.x = -1;

    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    this._renderer = renderer;
    this._camera = camera;
    this._scene = scene;
    this._mesh = mesh;

    this._rotateDelta = new THREE.Vector2(0, 0);
    this._rotationSpeed = 0.25;
    this._phi = Math.PI / 2;
    this._theta = 1.7 * Math.PI;
    this.acquireListeners();
    this.animate();
  };

  componentWillUnmount = (): void => {
    this.releaseListeners();

    this._scene.remove(this._mesh);
    this._renderer.dispose();
    this._mesh = null;
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

    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <Container>
        <BackButton onClick={this.props.goBack} />
        {this.state.isLoading && (
          <Loader type="Oval" color="white" height={100} width={100} />
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
