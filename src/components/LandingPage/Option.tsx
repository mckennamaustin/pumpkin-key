import React from 'react';
import styled, { css } from 'styled-components';

const Option = props => (
  <Container onClick={props.onClick}>
    <Text bold={props.isActive}>{props.text}</Text>
    <Line bold={props.isActive} />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  &,
  * {
    transition: all 250ms ease-in-out;
  }

  &:hover {
    span {
      opacity: 1;
    }
    div {
      border: 1.5px solid white;
      opacity: 1;
    }
  }
`;

const Text = styled.span`
  color: #ffffff;
  font-family: 'Bodoni Sans', sans-serif;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 2.18px;
  opacity: 0.6;

  cursor: pointer;
  ${props =>
    props.bold &&
    css`
      opacity: 1;
    `}
  text-transform: uppercase;
`;

const Line = styled.div`
  box-sizing: border-box;
  height: 1px;
  width: 35px;
  border: 1px solid #ffffff;
  margin-left: 20px;
  opacity: 0.6;
  ${props =>
    props.bold &&
    css`
      border: 1.5px solid white;
      opacity: 1;
    `}
`;

export default Option;
