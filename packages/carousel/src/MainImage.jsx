import React from 'react';
import join from './utils/join';

const MainImage = props => (
  <div
    className={join('ev-main-image-container', props.className)}
    style={{ backgroundImage: `url("${props.src}")` }}
  />
);

export default MainImage;
