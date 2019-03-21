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

interface Props {}

interface State {
  width: number;
  height: number;
  isPanoramaActive: boolean;
  activePanorama: Target;
  zoom: number;
  zoomDelta: number;
  isShowingVideoGallery: boolean;
}

const WIDTH = 3300;
const HEIGHT = 2175;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const ZOOM_SPEED = 0.005;
const ZOOM_DAMP = 0.75;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3.0;

export default class LandingPage extends Component<Props, State> {
  private container: HTMLDivElement;
  private transformGroup: SVGGElement;
  private svg: SVGElement;

  state = {
    width: 0,
    height: 0,
    isPanoramaActive: false,
    activePanorama: undefined,
    zoomDelta: 0.0,
    zoom: MIN_ZOOM,
    isShowingVideoGallery: false
  };

  componentDidMount = (): void => {
    this.resize();

    window.addEventListener('resize', this.resize, false);
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
    this.setState({ isShowingVideoGallery: true });
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
            src={this.state.activePanorama.src}
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
                />
                // <rect
                //   x={target.tl[0]}
                //   y={target.tl[1]}
                //   width={target.br[0] - target.tl[0]}
                //   height={target.br[1] - target.tl[1]}
                //   style={{ fill: 'black', fillOpacity: 0.0 }}
                //   onClick={() => this.activatePanorama(target)}
                // />
              ))}
            </svg>
          </>
        )}
        {this.state.isShowingVideoGallery && <VideoGallery />}
        <Footer openVideoGallery={this.openVideoGallery} />
      </Container>
    );
  }
}

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
