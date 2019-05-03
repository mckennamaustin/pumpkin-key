import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Carousel from 'ev-carousel-pro';

let assets = [];
for (let i = 0; i < 40; i++) {
  assets.push({
    src: `https://s3.amazonaws.com/sage.pumpkin-key/gallery/${i}.jpg`,
    thumbnail: `https://s3.amazonaws.com/sage.pumpkin-key/gallery/thumb/${i}.jpg`
  });
}

interface Props {
  closePhotoGallery: () => void;
}

export default class PhotoGallery extends Component<Props> {
  state = {
    activeIndex: 0,
    isFullscreen: false
  };

  render() {
    return (
      <Container onClick={() => this.props.closePhotoGallery}>
        <CarouselWrapper>
          <Carousel
            index={0}
            isFullscreen={window.innerWidth <= 768}
            images={assets}
            updateFullscreen={() => {}}
            indexChange={() => {}}
            exitCarousel={this.props.closePhotoGallery}
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
