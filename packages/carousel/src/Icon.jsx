import React from 'react';

import join from './utils/join';

const Icon = props => (
  <div {...props} className={join('ev-icon-container', props.className)}>
    <img src={props.src} className="ev-icon" />
  </div>
);

export default Icon;
