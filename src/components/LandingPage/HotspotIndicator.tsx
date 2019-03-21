import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  x: number;
  y: number;
  text: string;
}

interface State {
  width: number;
  height: number;
}

export default class HotspotIndicator extends Component<Props, State> {
  private text: SVGTextElement;

  state = {
    width: 0,
    height: 0
  };

  componentDidMount = () => {
    const { width, height } = this.text.getBBox();
    this.setState({ width: width + 50, height });
  };

  render() {
    const text = this.props.text;
    const { x, y } = this.props;

    const cx = this.state.width / 2;
    const height = 49;

    const triangleWidth = 30;
    const triangleWidthHalf = triangleWidth / 2;
    const trianglePoints = `${cx - triangleWidthHalf},${height} ${cx},${height +
      triangleWidthHalf} ${cx + triangleWidthHalf},${height}`;
    return (
      <g
        transform={`translate(${x}, ${y})`}
        viewBox={`0 0 ${this.state.width} ${this.state.height}`}>
        <polygon points={trianglePoints} fill="white" />
        <rect width={`${this.state.width}px`} height="50px" fill="white" />
        <Text
          x="30px"
          y={`${-1 + this.state.height + this.state.height / 3}px`}
          ref={text => {
            this.text = text;
          }}>
          {text}
        </Text>
      </g>
    );
  }
}

const Rect = styled.rect`
  cursor: pointer;
`;

const Text = styled.text`
  cursor: pointer;
  user-select: none;
  height: 14px;
  color: #4d575a;
  opacity: 0.8;
  font-family: 'Bodoni Sans';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 14px;
  text-align: center;
  text-transform: uppercase;
`;
