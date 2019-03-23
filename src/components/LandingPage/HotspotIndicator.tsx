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
        <Image
          xlinkHref="https://s3.amazonaws.com/sage.pumpkin-key/flag.svg"
          width="70"
          height="70"
          onClick={this.props.onClick}
        />
      </g>
    );
  }
}

const Image = styled.image`
  cursor: pointer;
  opacity: 0.8;
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
