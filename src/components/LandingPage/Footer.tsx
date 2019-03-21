import React, { Component } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  openVideoGallery: () => void;
}

interface State {}

export default class Footer extends Component<Props, State> {
  render() {
    return (
      <Container>
        <GalleryButton focus>
          <span>Photo Gallery</span>
        </GalleryButton>
        <GalleryButton onClick={this.props.openVideoGallery}>
          <span>Video Gallery</span>
        </GalleryButton>
      </Container>
    );
  }
}

const GalleryButton = styled.button`
  outline: none;
  margin: 0px;
  padding: 0px;
  border: none;
  background-color: transparent;
  height: 100%;
  padding: 0px 20px;

  span {
    color: #ffffff;
    font-family: 'Bodoni Sans';
    font-size: 22px;
    letter-spacing: 5px;
    line-height: 27px;
    text-transform: uppercase;
    padding: 5px 0px;
    text-align: center;
    ${props =>
      props.focus &&
      css`
        border-bottom: 2px solid white;
      `}
  }

  &:first-of-type {
    margin-right: 130px;
  }

  cursor: pointer;

  &:hover {
    background-color: #013e40;
  }

  transition: all 100ms ease-in-out;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 55px;
  width: 100vw;
  background-color: rgba(0, 78, 91, 0.9);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
