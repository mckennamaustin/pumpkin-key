import React from 'react';

const ThumbnailIndicator = props => (
  <div className="ev-thumbnail-indicator" onClick={props.toggleThumbnails}>
    {`${props.isShowingThumbnails ? 'Hide' : 'Thumbnails'}`}
  </div>
);

export default ThumbnailIndicator;
