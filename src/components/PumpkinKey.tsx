import React from 'react';
import styled from 'styled-components';

const PumpkinKey: React.SFC<{}> = props => (
  <Header {...props}>Pumpkin Key</Header>
);

const Header = styled.h1`
  width: auto;
  height: auto;
  color: white;
  text-transform: uppercase;
  height: auto;
  width: auto;
  color: #ffffff;
  font-family: 'Bodoni Sans';
  font-size: 64px;
  font-weight: 300;
  letter-spacing: 24.38px;
`;

export default PumpkinKey;
