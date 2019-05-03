import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Target } from './targets';

interface Props {
  x: number;
  y: number;
  onClick: () => void;
}

interface State {
  width: number;
  height: number;
}

export default class HotspotIndicator extends Component<Props, State> {
  componentDidMount = () => {};

  render() {
    const { x, y } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        {/* <rect
          x='-115px'
          y='-120px'
          width='300px'
          height='100px'
          fill='#003F3A'
        />
        <text
          x='0px'
          y='-70px'
          fill='white'
          fontSize='24px'
          fontFamily='Bodoni Sans'
        >
          Hi
        </text> */}
        <Image
          xlinkHref='https://s3.amazonaws.com/sage.pumpkin-key/zoom.png'
          width='74'
          height='74'
          onClick={this.props.onClick}
        />
      </g>
    );
  }
}

const Details = styled.rect`
  height: 41px;
  width: 136px;
  background-color: #003f3a;
`;

const Image = styled.image`
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 1;
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  transition: opacity 200ms ease-in-out;

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;
