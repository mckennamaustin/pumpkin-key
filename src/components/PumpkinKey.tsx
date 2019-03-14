import React from 'react';
import styled from 'styled-components';

const PumpkinKey: React.SFC<{}> = props => (
  <Header {...props}>Pumpkin Key</Header>
);

const Header = styled.h1`
  font-family: 'Srisakdi', cursive;
  color: black;
  font-size: 3rem;
  width: 300px;
  height: 100px;
  font-weight: 700;
`;

export default PumpkinKey;
