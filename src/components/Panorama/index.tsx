import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as THREE from 'three';
import bowser from 'bowser';
import clamp from '../../utils/clamp';
import { default as GenericBackButton } from './BackButton';
import Loader from 'react-loader-spinner';
import { preload } from '../LandingPage/targets';
import { DoubleSide } from 'three';
import mobile from 'is-mobile';

const FULLSCREEN_B64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAI60lEQVR4nO2dUYgdVxnHf99lWRaRUIqEEDRICDEPeRTEF5GyLEtZgoSwLqVIkKUiKsWHUCRICCKlBCmh+CRoqxKMGpA+lUREfJFiHwyJxGSzjdHaBEkbsDYkIfv9fZiZzblnz5l79+7mzt25+z9cdmbOmXNn/veb/3zfd87MmhDbePLoNH0A44JtooeEbaKHhG2ih4SJpg/gSUGujpk9DTwDfBGYApCEma1tn9neBx4BV4Hzkt61jj1KNWot0cDTwI+AeUqSgVUyY2IHJDns5x0z+ybwTqpda6XDzKYlzQNT0mMXtlqOiQ3bVOvxtlS7oJ/PA9/NHU9riQa+QGDJkJaH1I/Qj4yk9gO+nGvfZun4V0yWmWVJzG3LWXBGgj6RO5jWWrSkt4DLFRE5KehFsJmtfoK+u/pL9RujtUSb2TXgOHCtIrv6hATlyEoRG1pz/En1EaK1RGM8wnjTzL5BadmrVdHlXyFnqf2SWafr7SW6gvFHMzsGXEtWZ3Q4lJy4rkI/klGh/UQX+D3wPQKyYw8jloE6q6+wHt97PIg2HpnZ74DvAJdhrdXGslEh3hZrfNiuDuNBNIDhGOcpgorra6oTbltcF94UU5HleN4M8/gD8BJwrU4mcttykpLbVmH8iDacIgH0JvCw2tyvT9xvqB5j/IgWE8BRM/saMJnzOLp2CciMpSUOZnIYL6JFB3gOOAHshHrZWK8fXYfxIbqw5Ocl/UDSp3LJpF4Zu/CHiduP/c1QringBeAUsAf6y0vH3kXsAsbBS52EtDl7V0B0DFuQdMLMdqYyeqll6G9woM4LCdFuiy40eQE4CeysSyL16230MxiQQnuJFlPAIsVw1p5elpfK6sXp0lT+o1catkIriZarAzxPYcm7csNXMaI06LuSrueCmBTZYxWwlKPf88AJSbtg/VEcRYj+InBc0ppwPdw/znHnD6xNRZpy96OSbkqSu3d9KoTL0fqKu1+SNOvuE+4+IemQu18N+4j7Dfa/mzu2pqnZTJI7khbd/ZZqEJMc4ZKk6UTfM5JupPqJ+ms30e7ekXREUi3JPQhfljRb80MuuPtSj25bTLQ0IWmhJCopEfFln9h2VdIhSRM13zPp7kfcfTllzeXyB60kutTQRUm3ekhCFu5+USm5yBM+Xf2oCbzdPqILTZ6vNLlfoiMrvCFpZr3f7e7zkpaiG+FHkhbbRXRB8uHYsvrwCrpIdvcjkjoDED3p7s9KuiDpY3e/Iunbkna0h2ipUxL07wyB2W1B3SV3nx2E5IjwjqTKDaztaysmlT5pZl8FdqeyZ30k5v8BHDOz8+Voy8CwjjngRgsT/5IeUZDVRVId6QH+KekYxlsbJXm92HJEW8fuSXpN0hmiMT9FOQ09Dosd+DvwYjntYPhoXHMHLdJuSW+4+0pdmF3+XZI0t1FN3khpmq6NFWmPu59z95WU11HipoqosTGSxVYnGuHu+9z9rKQHsUWXfvKC6iK+IZXGidqUUsjIzyStBERXYXWjllyVxg9g00pB9rnSspclHXb3kSBZCBMtehZc7Ab2Af8FLmMkH0VrAqNDdBE8HQR2ANcwbjd8RJuK0fCji9HqOUnngAvAa4hdDR/V5qJp7SrzBXOSroZDSuXNbXfTx7dZpdmvL5L285KW42SQuz+QdFbS3qZJ2ozS3FcXWbjDZUCRy7atSPqNu3+6aaI2Whr5UnfvuPuz7t6VPE/ljssQ+42tLiPD/8pCLg5JulIFGDU5igoP3P0XkvY0TdigZeheh6SvAKclHaD0euKpV0HbavukmT0n6Vuo+/nurYKhEi3XDPAK8NnVbdHEQwUzfqJZQB0z2wtMDvOYNwv5ERbRkdQpT9TL0YSBUM6FmzazU8BeqJ+H3LXv40mE75vZWeB/gx5Ho0jpibvvUDHY+Dd3/8jdL0ialTQ5gCZX3sWNXlO0cvMvSvfvsEYkQTRIyZGzWBIcnvCSux9Z7xe4+7TK6VQZr6LXzfCWCl97y5KcJdrd/5KyLhXD+31PNilJvpgittfUgHL5lrt/XSOQT35SRH8QW1iA5XK4Py8jxRD8nGdmYcbEZ+qWNSJJ+ydGtKS7MbsRGUuS5muIngmDkczVsYbgSC4aH34aGtE9tPOGu6+REXd/RtLFnPamfrxo/ZakF9pEct9E50iSdMXd51REex13n1GhySvrteZy/aako5KmmiZms0vWj1bmUQF1R3AHzOxVirdx3QNeBfYH9dm3BCTeJvC+mb0E/HrYk1uGgfQIi7gLPKXEE0mrTbrXr5fb9sXPc+T2rerK9dtm9n1JP91IYDTKyBIt6aler8FZbZ7JU4T7dHXf/TTqbeCEmf0c4/5GT2hUkZWOuidMofv5utzrcHIhdbD8XikXv2qjXISoTSpVJKZeb5MjMbVPuF+w/h8zO8EYkAw1Fh1d3l118U0tJDfVPmxX4o6ZnQTOjAPJkCG6juSwPn5sN+FJpOrfo3jx35lRmnfxpJEkOjWZO+VJhG1zN8eo3R1Jx4FfttW7yKEv6YC1hMYPmqceUI+W7wAnzWxs5CJE9maYGVJaXQ/b5N4cEOzz0MxeB14fJ7kIkSU6lorUiEi8nHL1yjaTwBwwTQPjlKOAvk+6suqcy5a6aUbycsDMXqHmZdZtRpLoXLhdF8SkrD7R737gtFxjZ9nJk029USV01eJt1XKIUFqifQ6a2Y+BQ3VJrbah1qpyFpwjsarLkV7tU1r2y8D0oAe+1ZCVjvAvpEmu1nNveKlLNkk6IOmUXF/a8FlsAWSlI7TWmNRUHiMOxeOwO6wLPgfN7Ceo/TKStejUJ5U2DfdJaXuFVGKqxH7gh6WctBZZi47/Zi7/bA467iveFl0RB81sdpAT2CrIWfS9lAXmrDmWmboBgNh7Ca6Ez2zC+Ywschb9p/LvGs2tS+bnIsa4XbwM3Deztzd0JiOOnHt3GvhrHA3WDU/F9WGbOPkUtXkI/JbiHx60Frkxwwlgv6QZM/sc0KnT4xTpYbsaV+++mf2ZguQP25zVG53nDFuOsco3NIltooeEbaKHhG2ih4T/A1GzkmtyQCebAAAAAElFTkSuQmCC`;
const SHRINK_B64 = `data:image/png;base64,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`;

const Bowser = bowser.getParser(window.navigator.userAgent);
const Browser = Bowser.getBrowserName();

//@ts-ignore
const showHD = !mobile();

interface Props {
  name: string;
  src: string;
  sdSrc: string;
  initialTheta: number;
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

const DAMPENING_FACTOR = 0.9;

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
  private _isDampingEnabled: boolean;

  private _rotationSpeed: number;
  private _phi: number;
  private _theta: number;
  private _animationLoop: number;
  private _shouldAnimate: boolean;
  private _count: number;
  private _sdCount: number;
  private _yawMultiplier: number;
  private _pitchMultiplier: number;
  private _isFullscreen: boolean;
  private _container: HTMLDivElement;
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
        this._isDampingEnabled = true;
      }, 500);
    }
  };

  increaseSDCount = () => {
    this._sdCount++;

    if (this._sdCount >= 6) {
      this.setState({ loadSize: 50 });
      if (!showHD) {
        this.setState({ isLoading: false });
        this._isDampingEnabled = true;
      }
    }
  };

  private resize = (width: number, height: number): void => {
    this._renderer.setSize(width * 2, height * 2);

    this._renderer.domElement.style.width = `${width}px`;
    this._renderer.domElement.style.height = `${height}px`;
    this._canvas.width = width * 2;
    this._canvas.height = height * 2;

    const aspectRatio = width / height;
    this._camera.aspect = aspectRatio;
    this._camera.updateProjectionMatrix();
  };

  toggleFullscreen = () => {
    this._isFullscreen = !this._isFullscreen;

    if (this._isFullscreen) {
      this._container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  componentDidMount = () => {
    this._isFullscreen = false;
    this._pitchMultiplier = 0;
    this._yawMultiplier = 0;
    this._isDampingEnabled = false;
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
    this._theta = this.props.initialTheta;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true
    });

    const loader = new THREE.TextureLoader();
    const spx = loader.load(`${this.props.sdSrc}-px.jpg`, this.increaseSDCount);
    const snx = loader.load(`${this.props.sdSrc}-nx.jpg`, this.increaseSDCount);
    const spy = loader.load(`${this.props.sdSrc}-py.jpg`, this.increaseSDCount);
    const sny = loader.load(`${this.props.sdSrc}-ny.jpg`, this.increaseSDCount);
    const spz = loader.load(`${this.props.sdSrc}-pz.jpg`, this.increaseSDCount);
    const snz = loader.load(`${this.props.sdSrc}-nz.jpg`, this.increaseSDCount);
    if (showHD) {
      const px = loader.load(`${this.props.src}-px.jpg`, this.increaseCount);
      const nx = loader.load(`${this.props.src}-nx.jpg`, this.increaseCount);
      const py = loader.load(`${this.props.src}-py.jpg`, this.increaseCount);
      const ny = loader.load(`${this.props.src}-ny.jpg`, this.increaseCount);
      const pz = loader.load(`${this.props.src}-pz.jpg`, this.increaseCount);
      const nz = loader.load(`${this.props.src}-nz.jpg`, this.increaseCount);
      [px, nx, py, ny, pz, nz].forEach(texture => {
        texture.anisotropy = renderer.getMaxAnisotropy();
      });

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
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), materials);
      mesh.visible = false;
      mesh.scale.x = -1;
      scene.add(mesh);
      this._mesh = mesh;
    }

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

    const ldMesh = new THREE.Mesh(
      new THREE.BoxGeometry(15, 15, 15),
      sdMaterials
    );
    ldMesh.scale.x = -1;

    scene.add(ldMesh);

    this._renderer = renderer;
    this._camera = camera;
    this._scene = scene;
    this._ldMesh = ldMesh;

    this._rotateDelta = new THREE.Vector2(0, 0);
    this._rotationSpeed = 0.04;
    this._phi = Math.PI / 2;
    this.resize(window.innerWidth, window.innerHeight);
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
    document.addEventListener('touchstart', this.handleMouseDown, false);
    document.addEventListener('touchend', this.handleMouseUp, false);
    document.addEventListener('touchmove', this.handleMouseMove, false);
    window.addEventListener('resize', this.dispatchResize, false);
  };

  private dispatchResize = () => {
    this.resize(window.innerWidth, window.innerHeight);
  };

  releaseListeners = (): void => {
    document.removeEventListener('wheel', this.handleScrollWheel);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseleave', this.handleMouseUp);
    document.removeEventListener('mouseout', this.handleMouseUp);

    document.removeEventListener('touchstart', this.handleMouseDown);
    document.removeEventListener('touchend', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleMouseMove);

    document.removeEventListener('resize', this.dispatchResize);
    window.removeEventListener('resize', this.dispatchResize);
  };

  handleMouseUp = (): void => {
    this._isInteracting = false;
  };

  handleMouseMove = (event: any): void => {
    const { clientX, clientY } = positionFromEvent(event);

    if (this._isInteracting) {
      const rotationSpeed = this._isDampingEnabled ? this._rotationSpeed : 0.25;

      this._rotateEnd = new THREE.Vector2(clientX, clientY);
      const delta = new THREE.Vector2()
        .subVectors(this._rotateEnd, this._rotateStart)
        .multiplyScalar(rotationSpeed);
      if (this._isDampingEnabled) {
        this._rotateDelta = this._rotateDelta.add(delta);
      } else {
        this._rotateDelta.copy(delta);
      }

      this._rotateStart.copy(this._rotateEnd);
    }
  };

  startRotating = (yawMultiplier: number, pitchMultiplier: number = 0) => {
    this._yawMultiplier = yawMultiplier;
    this._pitchMultiplier = pitchMultiplier;
  };

  stopRotating = () => {
    this._yawMultiplier = 0;
    this._pitchMultiplier = 0;
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
    console.log(window.innerWidth, this._canvas.width);
    if (
      window.innerWidth * 2 !== Number(this._canvas.width) ||
      window.innerHeight * 2 !== Number(this._canvas.height)
    ) {
      console.log('resize');
      this.dispatchResize();
    }
    if (this._shouldAnimate) {
      const deltaTheta =
        (2 * Math.PI * this._rotateDelta.x) / window.innerWidth;
      const deltaPhi = (2 * Math.PI * this._rotateDelta.y) / window.innerHeight;

      this._phi -= deltaPhi;
      this._theta -= deltaTheta;
      this._theta += this._yawMultiplier * 0.05;
      this._phi -= this._pitchMultiplier * 0.05;
      this._phi = clamp(this._phi, 0.55, 2.43);
      if (this._isDampingEnabled) {
        this._rotateDelta.x *= DAMPENING_FACTOR;
        this._rotateDelta.y *= DAMPENING_FACTOR;
      } else {
        this._rotateDelta.x = 0;
        this._rotateDelta.y = 0;
      }

      const phi = this._phi;
      const theta = this._theta;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      const target = new THREE.Vector3(x, y, z);
      this._camera.lookAt(target);
      this._camera.updateMatrix();

      this._renderer.render(this._scene, this._camera);

      this._theta = theta;
    }
    this._animationLoop = requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <Container
        ref={container => {
          this._container = container;
        }}
      >
        <FullscreenToggle
          src={this._isFullscreen ? SHRINK_B64 : FULLSCREEN_B64}
          onClick={this.toggleFullscreen}
        />
        <BackButton onClick={this.props.goBack} />
        {this.state.isLoading && (
          <Loader
            type='Oval'
            color='white'
            width={this.state.loadSize}
            height={this.state.loadSize}
          />
        )}
        <Chevron
          src='https://s3.amazonaws.com/sage.pumpkin-key/chevronLeft.svg'
          bottom
          onMouseDown={() => this.startRotating(0, -1)}
          onMouseUp={this.stopRotating}
          onMouseOut={this.stopRotating}
          onTouchStart={() => this.startRotating(0, -1)}
          onTouchEnd={() => this.stopRotating()}
          onTouchOut={() => this.stopRotating()}
          draggable={false}
          onContextMenu={evt => evt.preventDefault()}
        />
        <Chevron
          src='https://s3.amazonaws.com/sage.pumpkin-key/chevronLeft.svg'
          top
          onMouseDown={() => this.startRotating(0, 1)}
          onMouseUp={() => this.stopRotating()}
          onTouchStart={() => this.startRotating(0, 1)}
          onTouchEnd={() => this.stopRotating()}
          onMouseOut={this.stopRotating}
          onTouchOut={() => this.stopRotating()}
          draggable={false}
          onContextMenu={evt => evt.preventDefault()}
        />
        <Chevron
          src='https://s3.amazonaws.com/sage.pumpkin-key/chevronLeft.svg'
          left
          onMouseDown={() => this.startRotating(-1)}
          onMouseUp={this.stopRotating}
          onMouseOut={this.stopRotating}
          onTouchStart={() => this.startRotating(-1)}
          onTouchEnd={() => this.stopRotating()}
          onTouchOut={() => this.stopRotating()}
          draggable={false}
          onContextMenu={evt => evt.preventDefault()}
        />
        <Chevron
          src='https://s3.amazonaws.com/sage.pumpkin-key/chevronRight.svg'
          right
          onMouseDown={() => this.startRotating(1)}
          onMouseUp={() => this.stopRotating()}
          onMouseOut={this.stopRotating}
          onTouchStart={() => this.startRotating(1)}
          onTouchEnd={() => this.stopRotating()}
          onTouchOut={() => this.stopRotating()}
          draggable={false}
          onContextMenu={evt => evt.preventDefault()}
        />
        <Label>{this.props.name}</Label>
        <Canvas
          ref={canvas => {
            this._canvas = canvas;
          }}
        />
      </Container>
    );
  }
}

const FullscreenToggle = styled.img`
  user-select: none;
  width: 35px;
  height: 35px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 100000;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  transition: all 250ms ease-in-out;
  opacity: 0.6;
`;

const Label = styled.span`
  text-transform: uppercase;
  color: #ffffff;
  font-family: 'Bodoni Sans';
  font-size: 22px;
  letter-spacing: 5.5px;
  line-height: 27px;
  text-align: right;

  position: fixed;
  top: 10px;
  right: 25px;
  z-index: 2;
`;

const Chevron = styled.img`
  user-select: none;

  z-index: 2;
  width: 75px;
  height: 75px;
  opacity: 0.5;
  position: fixed;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  &:hover {
    opacity: 1;
  }
  ${props =>
    props.left &&
    css`
      left: 0px;
      top: 50%;
    `};
  ${props =>
    props.right &&
    css`
      right: 0px;
      top: 50%;
    `};

  ${props =>
    props.top &&
    css`
      width: 50px;
      height: 50px;

      top: 0px;
      left: 50%;
      margin-left: -25px;
      transform: rotate(90deg);
    `}

  ${props =>
    props.bottom &&
    css`
      width: 50px;
      height: 50px;

      bottom: 0px;
      left: 50%;

      margin-left: -25px;
      transform: rotate(-90deg);
    `}
`;

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
    transition: all 500ms ease-in-out;
  }
`;

const BackButton = styled(GenericBackButton)`
  position: absolute;
  top: 10px;
  left: 10px;

  z-index: 10;
`;

const Canvas = styled.canvas`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
