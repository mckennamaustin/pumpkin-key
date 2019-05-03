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
import Option from './Option';
import IslandOverview from '../IslandOverview';
import DevelopmentOptions from '../DevelopmentOptions';

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
  mode: string;
  developmentOption: string;
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
    isShowingPhotoGallery: false,
    mode: 'exploring-island',
    developmentOption: 'development-island'
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

  public resetMode = () => {
    this.setState({ mode: 'exploring-island' });
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

  activateMode = (mode: string) => {
    this.setState({ mode });
  };

  handleOptionChange = (option: string) => {
    this.setState({ developmentOption: option });
  };

  render() {
    let imageSource =
      'https://s3.amazonaws.com/sage.pumpkin-key/overviewLarge.jpg';
    if (this.state.mode === 'development-options') {
      imageSource = {
        'development-island':
          'https://s3.amazonaws.com/sage.pumpkin-key/developmentIsland.jpg',
        'private-island':
          'https://s3.amazonaws.com/sage.pumpkin-key/privateIsland.jpg',
        'residential-island':
          'https://s3.amazonaws.com/sage.pumpkin-key/residentialIsland.jpg'
      }[this.state.developmentOption];
    }

    return (
      <Container
        ref={container => {
          this.container = container;
        }}
        key='ev-container'
      >
        {this.state.isPanoramaActive ? (
          <Panorama
            name={this.state.activePanorama.name}
            src={`https://s3.amazonaws.com/sage.pumpkin-key/hdPanoramas/0-0-${
              this.state.activePanorama.id
            }`}
            sdSrc={`https://s3.amazonaws.com/sage.pumpkin-key/sdPanoramas/0-0-${
              this.state.activePanorama.id
            }`}
            initialTheta={this.state.activePanorama.initialTheta}
            goBack={this.deactivatePanorama}
          />
        ) : (
          <>
            <PumpkinKey />
            <OptionsMenu>
              <Option
                text='Explore the Island'
                isActive={this.state.mode === 'exploring-island'}
                onClick={() => this.activateMode('exploring-island')}
              />
              <Option
                text='Island Overview'
                isActive={this.state.mode === 'island-overview'}
                onClick={() => this.activateMode('island-overview')}
              />
              <Option
                text='Photo Gallery'
                isActive={this.state.mode === 'photo-gallery'}
                onClick={() => this.activateMode('photo-gallery')}
              />
              <Option
                text='Video Gallery'
                isActive={this.state.mode === 'video-gallery'}
                onClick={() => this.activateMode('video-gallery')}
              />
              <Option
                text='Development Options'
                isActive={this.state.mode === 'development-options'}
                onClick={() => this.activateMode('development-options')}
              />
            </OptionsMenu>
            <svg
              viewBox={` 0 0 ${WIDTH} ${HEIGHT}`}
              key='ev-svg'
              ref={svg => {
                this.svg = svg;
              }}
              preserveAspectRatio='xMidYMid slice'
              style={{
                width: '100%',
                height: '105vh',
                backgroundColor: 'black'
              }}
            >
              <image
                key='ev-image'
                xlinkHref={imageSource}
                width='100%'
                height='100%'
              />
              <rect width='100%' height='100%' fill='black' opacity='0.2' />
              {this.state.mode !== 'development-options' &&
                targets.map(target => (
                  <HotspotIndicator
                    x={target.tl[0]}
                    y={target.tl[1]}
                    onClick={() => this.activatePanorama(target)}
                  />
                ))}
            </svg>
          </>
        )}
        {this.state.mode === 'video-gallery' && (
          <VideoGallery closeVideoGallery={this.resetMode} />
        )}
        {this.state.mode === 'photo-gallery' && (
          <PhotoGallery closePhotoGallery={this.resetMode} />
        )}
        {this.state.mode === 'island-overview' && (
          <IslandOverview closeOverview={this.resetMode} />
        )}
        {this.state.mode === 'development-options' && (
          <DevelopmentOptions
            option={this.state.developmentOption}
            receiveOptionChange={this.handleOptionChange}
          />
        )}
        {/* {!this.state.isPanoramaActive && (
          <Footer
            isPhotoGalleryFocused={this.state.isShowingPhotoGallery}
            isVideoGalleryFocused={this.state.isShowingVideoGallery}
            openVideoGallery={this.openVideoGallery}
            openPhotoGallery={this.openPhotoGallery}
          />
        )} */}
      </Container>
    );
  }
}

const OptionsMenu = styled.div`
  position: absolute;
  top: 20%;
  right: 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0px 15px;
`;

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
  top: 25px;
  left: 30px;
`;

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  margin-bottom: -10px;
  min-height: 100vh;

  overflow: hidden;
`;

const TransparentBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: red;
  z-index: 1000000;
`;
