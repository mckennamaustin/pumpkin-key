import React, { Component } from 'react';
import Icon from './Icon';
import { CHEVRON_LEFT, CHEVRON_RIGHT } from './base64';

const DRAG_TOLERANCE = 10;

class ThumbnailReel extends Component {
  state = {
    isDragging: false,
    startX: 0,
    dragDeltaX: 0,
    clientXOnSelection: 0
  };

  startDrag = evt => {
    this.setState({ isDragging: true, startX: evt.clientX });
  };

  cancelDrag = () => {
    this.setState({ isDragging: false });
  };

  handleDrag = evt => {
    if (this.state.isDragging) {
      evt.stopPropagation();
      const dragDeltaX = this.state.startX - evt.clientX;
      this.setState({ dragDeltaX });
    }
  };

  render() {
    return (
      <div
        className="ev-thumbnail-reel"
        onMouseDown={this.startDrag}
        onMouseMove={this.handleDrag}
        onMouseUp={this.cancelDrag}
        onMouseLeave={this.cancelDrag}
        onMouseOut={this.cancelDrag}
        onTouchStart={this.startDrag}
        onTouchCancel={this.cancelDrag}
        onTouchEnd={this.cancelDrag}
        onTouchMove={this.handleDrag}
        draggable="false">
        <Icon src={CHEVRON_LEFT} className="thumbnail-left-chevron" />
        <div className="ev-thumbnails" draggable="false">
          {React.Children.map(this.props.children, (child, index) => {
            let className = undefined;
            const active = index === this.props.index;
            if (active) {
              className = 'active';
            }

            let dragPct = this.state.dragDeltaX / 25;
            console.log(dragPct);

            let left = '0px';
            const thumbnailRef = document.getElementById('ev-thumbnail-image');
            const gutter = 10;
            const imageSizePx =
              ((thumbnailRef && thumbnailRef.clientWidth) || 0) + gutter;
            if (this.props.index > 5) {
              const remainder = this.props.index - 5;
              const pct = imageSizePx * remainder;
              left = '-' + pct + 'px';
            }

            return React.cloneElement(child, {
              className,
              mouseDown: evt => {
                this.setState({ clientXOnSelection: evt.clientX });
              },
              mouseUp: evt => {
                if (
                  Math.abs(this.state.clientXOnSelection - evt.clientX) <=
                  DRAG_TOLERANCE
                ) {
                  this.props.goToIndex(index);
                }
              },
              left
            });
          })}
        </div>
        <Icon src={CHEVRON_RIGHT} className="thumbnail-right-chevron" />
      </div>
    );
  }
}

export default ThumbnailReel;
