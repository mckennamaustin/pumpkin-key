import React from 'react';
import join from './utils/join';

const ThumbnailImage = props => (
  <div
    id="ev-thumbnail-image"
    className={join('ev-thumbnail-image-container', props.className)}
    style={{
      backgroundImage: `url("${props.src}")`,
      left: props.left || '0px',
      order: props.order || 0
    }}
    onMouseDown={props.mouseDown}
    onMouseUp={props.mouseUp}
    draggable="false"
  />
);

export default ThumbnailImage;
