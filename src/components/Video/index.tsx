import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  src: string;
  exitVideo: () => void;
}

interface State {}

export default class Video extends Component<Props, State> {
  render() {
    return (
      <TransparentBackground onClick={this.props.exitVideo}>
        <VideoContainer>
          <ExitButton onClick={this.props.exitVideo}>&times;</ExitButton>
          <VideoPlayer src={this.props.src} preload="auto" controls autoPlay />
        </VideoContainer>
      </TransparentBackground>
    );
  }
}

const TransparentBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ExitButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  border: none;
  outline: none;
  cursor: pointer;

  transition: all 250ms ease-in-out;

  &:hover {
    cursor: pointer;

    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 54px -14px rgba(0, 0, 0, 0.75);
  max-width: 50vw;
  z-index: 5;
`;

const VideoPlayer = styled.video`
  max-width: 100%;
`;
