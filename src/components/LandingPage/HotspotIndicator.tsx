import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Target } from './targets';

interface Props {
  x: number;
  y: number;
  name: string;
  onClick: () => void;
}

interface State {
  isHovering: boolean;
}

export default class HotspotIndicator extends Component<Props, State> {
  state = {
    isHovering: false
  };
  componentDidMount = () => {};

  startHover = () => {
    this.setState({ isHovering: true });
  };

  stopHover = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { x, y } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        {this.state.isHovering && (
          <g>
            <rect
              x='-215px'
              y='-120px'
              width='500px'
              height='100px'
              fill='#003F3A'
            />
            <rect
              x='-200px'
              y='-105px'
              width='470px'
              height='70px'
              fill='#003F3A'
              stroke='white'
              strokeWidth='2'
            />
            <svg width='500px' height='100px' x='-215px' y='-120px'>
              <Text
                x='50%'
                y='60%'
                alignmentBaseline='middle'
                textAnchor='middle'
              >
                {this.props.name}
              </Text>
            </svg>
            {/* <Text fill='white'>Beachfront</Text> */}
          </g>
        )}

        <Image
          xlinkHref='https://s3.amazonaws.com/sage.pumpkin-key/zoom.png'
          width='74'
          height='74'
          onClick={this.props.onClick}
          onMouseOver={this.startHover}
          onMouseOut={this.stopHover}
          onMouseLeave={this.stopHover}
        />
      </g>
    );
  }
}

const Text = styled.text`
  font-family: 'Bodoni Sans', sans-serif;
  text-transform: uppercase;
  font-size: 32px;
  text-anchor: middle;
  dominant-baseline: middle;
  letter-spacing: 2.61px;
  color: white;
  fill: white;
`;

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
