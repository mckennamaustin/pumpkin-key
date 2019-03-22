import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { default as GenericPumpkinKey } from '../PumpkinKey';
import Panorama from '../Panorama';
import { string } from 'prop-types';
import _ from 'lodash';

import mouseWheel from 'mouse-wheel';
import HotspotIndicator from './HotspotIndicator';
import targets, { Target, Vector2 } from './targets';
import Footer from './Footer';
import VideoGallery from '../VideoGallery';
import PhotoGallery from '../PhotoGallery';
import Renderer from '../../state/renderer';
import { SageTourInternal } from '../../../packages/sage-tour';

interface Props {}

interface State {
  width: number;
  height: number;
  isPanoramaActive: boolean;
  activePanorama: Target;
  zoom: number;
  zoomDelta: number;
  isShowingVideoGallery: boolean;
  isShowingPhotoGallery: boolean;
}

const WIDTH = 3300;
const HEIGHT = 2175;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const ZOOM_SPEED = 0.005;
const ZOOM_DAMP = 0.75;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3.0;

const panoramaGraph = [
  {
    id: 0,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '0'
  },
  {
    id: 1,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '1'
  },
  {
    id: 2,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '2'
  },
  {
    id: 3,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '3'
  },
  {
    id: 4,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '4'
  },
  {
    id: 5,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '5'
  },
  {
    id: 6,
    floor: 1,
    position: { x: 0, y: 0 },
    edges: [],
    name: '6'
  }
];

export default class LandingPage extends Component<Props, State> {
  private container: HTMLDivElement;
  private transformGroup: SVGGElement;
  private svg: SVGElement;
  private canvasContainer: HTMLDivElement;
  private tour: SageTourInternal;

  state = {
    width: 0,
    height: 0,
    isPanoramaActive: false,
    activePanorama: undefined,
    zoomDelta: 0.0,
    zoom: MIN_ZOOM,
    isShowingVideoGallery: false,
    isShowingPhotoGallery: false
  };

  componentDidMount = (): void => {
    this.resize();
    //this.state.renderer.preload(targets);
    window.addEventListener('resize', this.resize, false);

    const opts = {
      imagePathRoot: `https://s3.amazonaws.com/sage.pumpkin-key/panoramas`,
      disableControls: false
    };

    // this.tour = new SageTourInternal(
    //   this.canvasContainer,
    //   panoramaGraph,
    //   () => {
    //     this.tour.controller().setFOV(60);
    //   },
    //   opts
    // );
  };

  componentWillUnmount = (): void => {
    window.removeEventListener('resize', this.resize);
  };

  resize = (): void => {
    const { clientWidth, clientHeight } = this.container;

    this.setState({ width: clientWidth, height: clientHeight });
  };

  activatePanorama = (target: Target): void => {
    this.setState({ isPanoramaActive: true, activePanorama: target });
    //this.tour.changePanorama(target.id);
  };

  deactivatePanorama = (): void => {
    this.setState({ isPanoramaActive: false, activePanorama: undefined });
  };

  makeTransform = (): string => {
    const cx = CX;
    const cy = CY;
    return `translate(${cx}, ${cy}) scale(${
      this.state.zoom
    }) translate(${-cx}, ${-cy}) `;
  };

  openVideoGallery = () => {
    this.setState({
      isShowingVideoGallery: true,
      isShowingPhotoGallery: false
    });
  };

  closeVideoGallery = () => {
    this.setState({
      isShowingVideoGallery: false,
      isShowingPhotoGallery: false
    });
  };

  openPhotoGallery = () => {
    this.setState({
      isShowingVideoGallery: false,
      isShowingPhotoGallery: true
    });
  };

  closePhotoGallery = () => {
    this.setState({
      isShowingVideoGallery: false,
      isShowingPhotoGallery: false
    });
  };

  render() {
    return (
      <Container
        ref={container => {
          this.container = container;
        }}
        key="ev-container">
        {this.state.isPanoramaActive ? (
          <Panorama
            src={`https://s3.amazonaws.com/sage.pumpkin-key/hdPanoramas/0-0-${
              this.state.activePanorama.id
            }`}
            sdSrc={`https://s3.amazonaws.com/sage.pumpkin-key/sdPanoramas/0-0-${
              this.state.activePanorama.id
            }`}
            goBack={this.deactivatePanorama}
          />
        ) : (
          <>
            <PumpkinKey />
            <svg
              viewBox={` 0 0 ${WIDTH} ${HEIGHT}`}
              width={`${this.state.width}px`}
              height={`${this.state.height}px`}
              key="ev-svg"
              ref={svg => {
                this.svg = svg;
              }}
              preserveAspectRatio="xMidYMid slice">
              <image
                key="ev-image"
                xlinkHref="https://s3.amazonaws.com/sage.pumpkin-key/overview.jpg"
                width="100%"
                height="100%"
                y="120px"
              />
              <rect width="100%" height="100%" fill="black" opacity="0.15" />
              {targets.map(target => (
                <HotspotIndicator
                  text={target.name}
                  x={target.tl[0]}
                  y={target.tl[1]}
                  onClick={() => this.activatePanorama(target)}
                />
              ))}
            </svg>
          </>
        )}
        {this.state.isShowingVideoGallery && (
          <VideoGallery closeVideoGallery={this.closeVideoGallery} />
        )}
        {this.state.isShowingPhotoGallery && (
          <PhotoGallery closePhotoGallery={this.closePhotoGallery} />
        )}
        {!this.state.isPanoramaActive && (
          <Footer
            isPhotoGalleryFocused={this.state.isShowingPhotoGallery}
            isVideoGalleryFocused={this.state.isShowingVideoGallery}
            openVideoGallery={this.openVideoGallery}
            openPhotoGallery={this.openPhotoGallery}
          />
        )}
        <Canvas
          ref={container => {
            this.canvasContainer = container;
          }}
          visible={this.state.isPanoramaActive}
        />
      </Container>
    );
  }
}

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed !important;
  top: 0px;
  left: 0px;
  z-index: 30000000;
  visibility: hidden;

  ${props =>
    props.visible &&
    css`
      .visibility: visible;
    `};
`;

const PumpkinKey = styled(GenericPumpkinKey)`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, 0%);
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;

  rect {
    cursor: pointer;
  }
`;

const TransparentBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: red;
  z-index: 1000000;
`;
