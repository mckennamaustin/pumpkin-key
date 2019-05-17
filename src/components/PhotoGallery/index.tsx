import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Carousel from 'ev-carousel-pro';

let assets = [];
for (let i = 0; i < 40; i++) {
  let j = (i + 12) % 40;
  assets.push({
    src: `https://s3.amazonaws.com/sage.pumpkin-key/gallery/${j}.jpg`,
    thumbnail: `https://s3.amazonaws.com/sage.pumpkin-key/gallery/thumb/${j}.jpg`
  });
}

interface Props {
  closePhotoGallery: () => void;
}

interface State {
  activeIndex: number;
  isFullscreen: boolean;
}

export default class PhotoGallery extends Component<Props, State> {
  state = {
    activeIndex: 0,
    isFullscreen: false
  };

  render() {
    let label = '';
    const index = Number(this.state.activeIndex);
    console.log(index);
    if (index >= 28 && index <= 39) {
      label = 'Harbour House';
    }

    return (
      <Container onClick={() => this.props.closePhotoGallery}>
        <CarouselWrapper>
          <Carousel
            index={0}
            isFullscreen={window.innerWidth <= 768}
            images={assets}
            updateFullscreen={() => {}}
            indexChange={index => {
              this.setState({ activeIndex: index });
            }}
            exitCarousel={this.props.closePhotoGallery}
            label={label}
          />
        </CarouselWrapper>
      </Container>
    );
  }
}

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
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CarouselWrapper = styled.div`
  width: 80%;
  height: 90%;
`;
