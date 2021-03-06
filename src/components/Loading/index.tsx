import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Loader from 'react-loader-spinner';

interface Props {
  endLoad: () => void;
}

interface State {
  loadPercent: number;
}

export default class Loading extends Component<Props, State> {
  state: {
    loadPercent: 0;
  };

  componentDidMount = () => {
    this.load();
  };

  load = () => {
    const images: string[] = [
      'https://s3.amazonaws.com/sage.pumpkin-key/overview.jpg',
      'https://s3.amazonaws.com/sage.pumpkin-key/overviewLarge.jpg'
    ];

    const promises = images.map(src => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(promises).then(() => {
      this.props.endLoad();
    });
  };

  render() {
    return (
      <Container>
        <TransparentBackground />
        <Span>LOADING...</Span>
        <Loader type='Circles' color='white' height='100' width='100' />
      </Container>
    );
  }
}

const Span = styled.span`
  font-family: 'Bodoni Sans';
  color: white;
  font-size: 42px;
  margin-bottom: 30px;
`;

const TransparentBackground = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: black;
  background-image: url('https://s3.amazonaws.com/sage.pumpkin-key/overviewSmall.jpg');

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > :not(:nth-child(1)) {
    z-index: 2;
  }
`;
