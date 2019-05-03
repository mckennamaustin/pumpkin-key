import React from 'react';
import styled from 'styled-components';

const PumpkinKey: React.SFC<{}> = props => (
  <Img
    src='https://s3.amazonaws.com/sage.pumpkin-key/PUMPKINKEY-logo%401.5x.svg'
    alt='Pumpkin Key'
    {...props}
  />
);
const Img = styled.img`
  height: 20.45px;
  width: 264.66px;
`;

export default PumpkinKey;
