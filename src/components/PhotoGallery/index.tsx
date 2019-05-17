import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Carousel from 'ev-carousel-pro';

const order: number[] = [
  12,
  13,
  14,
  15,
  16,
  17,
  18,

  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  19,
  20,
  21,
  22,
  23
];
let assets = order.map(j => {
  return {
    src: `https://s3.amazonaws.com/sage.pumpkin-key/gallery/${j}.jpg`,
    thumbnail: `https://s3.amazonaws.com/sage.pumpkin-key/gallery/thumb/${j}.jpg`
  };
});

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
    if (index >= 23) {
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
