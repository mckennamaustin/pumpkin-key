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

  img {
    width: 8px;
    margin-right: 10px;
  }
`;

export default BackButton;
