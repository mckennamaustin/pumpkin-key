import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { default as GenericPumpkinKey } from '../PumpkinKey';
import Panorama from '../Panorama';
import { string } from 'prop-types';
import Video from '../Video';

interface Props {}

interface State {
  width: number;
  height: number;
  isPanoramaActive: boolean;
  activePanorama: Target;
  isShowingVideo: boolean;
  videoSrc: string;
}

type Vector2 = number[];

interface Target {
  name: string;
  tl: Vector2;
  br: Vector2;
  src: string;
}

const targets: Target[] = [
  {
    name: 'dock',
    tl: [1098, 1438],
    br: [1520, 1642],
    src: '/dock.jpg'
  },
  {
    name: 'beach',
    tl: [1886, 1384],
    br: [2310, 1466],
    src: '/beach.jpg'
  },
  {
    name: 'house',
    tl: [1592, 1224],
    br: [1774, 1338],
    src: '/house.jpg'
  },
  {
    name: 'court',
    tl: [1667, 980],
    br: [1828, 1068],
    src: '/quarters.jpg'
  },
  {
    name: 'quarters',
    tl: [678, 980],
    br: [860, 1052],
    src: '/quarters.jpg'
  }
];

export default class LandingPage extends Component<Props, State> {
  private container: HTMLDivElement;

  state = {
    width: 0,
    height: 0,
    isPanoramaActive: false,
    activePanorama: undefined,
    isShowingVideo: false,
    videoSrc: ''
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

  activateVideo = (src: string): void => {
    this.setState({ isShowingVideo: true, videoSrc: src });
  };

  deactivateVideo = (): void => {
    this.setState({ isShowingVideo: false, videoSrc: '' });
  };

  render() {
    return (
      <Container
        ref={container => {
          this.container = container;
        }}>
        {this.state.isPanoramaActive ? (
          <Panorama
            src={this.state.activePanorama.src}
            goBack={this.deactivatePanorama}
          />
        ) : (
          <>
            {this.state.isShowingVideo && (
              <Video
                src={this.state.videoSrc}
                exitVideo={this.deactivateVideo}
              />
            )}
            <PumpkinKey />
            <VideoButtonList>
              <VideoButton
                onClick={() =>
                  this.activateVideo(
                    'https://s3.amazonaws.com/assets.misc/pumpkinkey1.mp4'
                  )
                }>
                Video 1
              </VideoButton>
              <VideoButton
                onClick={() =>
                  this.activateVideo(
                    'https://s3.amazonaws.com/assets.misc/pumpkinkey2.mp4'
                  )
                }>
                Video 2
              </VideoButton>
            </VideoButtonList>
            <svg
              viewBox={`0 0 3672 2058`}
              width={`${this.state.width}px`}
              height={`${this.state.height}px`}
              preserveAspectRatio="none">
              <image xlinkHref="/pumpkin_key.jpg" width="100%" height="100%" />
              {targets.map(target => (
                <rect
                  x={target.tl[0]}
                  y={target.tl[1]}
                  width={target.br[0] - target.tl[0]}
                  height={target.br[1] - target.tl[1]}
                  style={{ fill: 'black', fillOpacity: 0.0 }}
                  onClick={() => this.activatePanorama(target)}
                />
              ))}
            </svg>
          </>
        )}
      </Container>
    );
  }
}

const VideoButtonList = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const VideoButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: 1px solid white;
  outline: none;
  font-family: 'Roboto', sans-serif;
  margin-top: 10px;

  cursor: pointer;
  &:hover {
    background-color: rgb(100, 100, 100);
  }
`;

const PumpkinKey = styled(GenericPumpkinKey)`
  position: absolute;
  top: 50px;
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
