import React from 'react';
import join from './utils/join';

const Thumbnail = props => (
  <div
    className={join('ev-thumbnail', props.className)}
    style={{ backgroundImage: `url("${props.src}")`, left: props.left }}
    id={props.id}
    onMouseDown={props.mouseDown}
    onMouseUp={props.mouseUp}>
    {props.children}
  </div>
);
export default Thumbnail;
