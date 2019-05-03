import React from 'react';
import styled, { css } from 'styled-components';
interface Props {
  close: () => void;
}
const Instructions: React.SFC<Props> = props => {
  return (
    <Container onClick={props.close}>
      <ChildContainer>
        <Icon src='https://s3.amazonaws.com/sage.pumpkin-key/touch-finger%401.5x.svg' />
        <Text>Click and drag to Explore</Text>
        <CloseText onClick={props.close}>Close</CloseText>
      </ChildContainer>
    </Container>
  );
};

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;
const CloseText = styled.span`
  color: #ffffff;
  font-family: 'Bodoni Sans', sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 18px;
  text-align: center;
  opacity: 0.7;
  cursor: pointer;
  text-transform: uppercase;
`;
const Text = styled.span`
  color: #ffffff;
  font-family: 'Bodoni Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2px;
  line-height: 18px;
  text-align: center;

  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ChildContainer = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 159px;
  width: 162px;
`;

const Container = styled.div`
  height: 184px;
  width: 184px;
  background-color: #003f3a;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.75);

  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -92px;
  margin-top: -92px;

  &,
  * {
    user-select: none;
  }
`;

export default Instructions;
