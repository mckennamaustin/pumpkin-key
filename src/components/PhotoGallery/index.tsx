import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  closePhotoGallery: () => void;
}

interface State {
  index: number;
}

let assets = [];
for (let i = 0; i < 40; i++) {
  assets.push(`https://s3.amazonaws.com/sage.pumpkin-key/gallery/${i}.jpg`);
}
const MIN_INDEX = 0;
const MAX_INDEX = assets.length;

export default class PhotoGallery extends Component<Props, State> {
  state = {
    index: 0
  };

  componentDidMount = () => {
    assets.forEach((src, index) => {
      if (index !== 0) {
        new Image().src = src;
      }
    });
  };

  moveIndex = delta => {
    let index = this.state.index + delta;

    if (index < 0) {
      index = MAX_INDEX - 1;
    } else if (index > MAX_INDEX) {
      index = 0;
    }

    this.setState({ index });
  };

  render() {
    return (
      <Container>
        <TransparentBackground onClick={this.props.closePhotoGallery} />

        <PhotoDisplay>
          <Chevron
            src={'https://s3.amazonaws.com/sage.pumpkin-key/chevronLeft.svg'}
            left
            onClick={() => this.moveIndex(-1)}
          />
          <Photo src={assets[this.state.index]} />
          <Chevron
            src="https://s3.amazonaws.com/sage.pumpkin-key/chevronRight.svg"
            right
            onClick={() => this.moveIndex(1)}
          />
        </PhotoDisplay>
        <ExitButton onClick={this.props.closePhotoGallery}>&times;</ExitButton>
      </Container>
    );
  }
}

const ExitButton = styled.span`
  cursor: pointer;
  font-size: 48px;
  font-weight: 300;
  color: white;
  position: absolute;
  top: 10px;
  right: 20px;
  letter-spacing: 0px;
  margin: 0px;
  padding: 0px;
`;

const Chevron = styled.img`
  width: 45px;
  height: 45px;
  cursor: pointer;

  position: absolute;
  top: 50%;
  ${props =>
    props.right &&
    css`
      right: 0px;
    `};
  ${props =>
    props.left &&
    css`
      left: 0px;
    `};

  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  transition: all 200ms ease-in-out;
`;

const TransparentBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0px;
  left: 0px;
`;

const Photo = styled.img`
  width: 100%;
`;

const PhotoDisplay = styled.div`
  z-index: 10;
  width: 60vw;

  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  position: relative;
`;

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);

  position: fixed;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
