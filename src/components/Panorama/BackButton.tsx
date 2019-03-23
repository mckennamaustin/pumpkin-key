import React from 'react';
import styled, { css } from 'styled-components';

const BackButton: React.SFC<{}> = props => (
  <Button {...props}>
    <img src="https://s3.amazonaws.com/sage.pumpkin-key/chevronLeft.svg" />
    Back
  </Button>
);

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  outline: none;
  border: none;
  background-color: transparent;

  text-transform: uppercase;
  color: #ffffff;
  font-family: 'Bodoni Sans';
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 22px;

  cursor: pointer;

  img {
    height: 22px;
    width: 12px;
    margin-right: 10px;
  }
`;

export default BackButton;
