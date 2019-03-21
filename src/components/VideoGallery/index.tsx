import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import VideoPlayer from 'react-player';
interface Props {}

interface State {
  isFullscreen: boolean;
  videoSrc: string;
}

const PLAY_ICON = `data:image/png;base64,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`;

export default class VideoGallery extends Component<Props, State> {
  state = {
    isFullscreen: false,
    videoSrc: ''
  };

  playVideo = src => {
    this.setState({ isFullscreen: true, videoSrc: src });
  };

  render() {
    return (
      <Container>
        <TransparentBackground />
        {this.state.isFullscreen ? (
          <VideoPlayer url={this.state.videoSrc} className="video-player" />
        ) : (
          <ThumbnailGrid>
            <ThumbnailVideo
              gc="1/2"
              thumbnail="https://s3.amazonaws.com/sage.pumpkin-key/video1Thumbnail.jpeg"
              onClick={() => this.playVideo('https://vimeo.com/325666928')}>
              <PlayButton>
                <img src={PLAY_ICON} />
              </PlayButton>
            </ThumbnailVideo>
            <ThumbnailVideo
              gc="2/3"
              thumbnail="https://s3.amazonaws.com/sage.pumpkin-key/video2Thumbnail.jpeg"
              onClick={() => this.playVideo('https://vimeo.com/325667088')}>
              <PlayButton>
                <img src={PLAY_ICON} />
              </PlayButton>
            </ThumbnailVideo>
          </ThumbnailGrid>
        )}
      </Container>
    );
  }
}

// <VideoPlayer
//           className="video-player"
//           url={'https://vimeo.com/325666928'}
//         />

const PlayButton = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    position: relative;
    left: 5px;
    width: 50%;
  }
`;

const ThumbnailVideo = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: 1px solid white;
  grid-row: 1/2;
  ${props =>
    css`
      grid-column: ${props.gc};
    `};
  z-index: 11;
  background-color: black;
  box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.75);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props => css`
    background-image: url(${props.thumbnail});
  `}
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: 30vw 30vw;
  grid-template-rows: 20vw;
  grid-gap: 5vw;
  padding: 10px 10px;
  z-index: 10;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .video-player {
    width: 65% !important;
    height: 75% !important;
    z-index: 11;
  }
`;

const TransparentBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0px;
  left: 0px;
`;
