import React, { Component } from 'react';
import { ringDistance } from './utils/math';

const MARGIN = 10;
const DRAG_TOLERANCE = 10;
const THUMBNAIL_WIDTH_PCT = 15;
const PRESENT_ON_SCREEN = Math.floor(100 / THUMBNAIL_WIDTH_PCT);

function clientXFromEvent(evt) {
  if (evt.touches && evt.touches.length >= 0) {
    return evt.touches[0].clientX;
  }

  return evt.clientX;
}

export default class ThumbnailReel extends Component {
  state = {
    isDragging: false,
    startDragX: 0,
    dragX: 0,
    boxWidth: 0,
    containerWidth: 0,
    relativeLeft: 0,
    offscreenLeft: 0,
    balancedIndices: [],
    clientXOnSelection: 0
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.index !== this.props.index) {
      const index = this.props.index;
      const ref = this.thumbnailById(index);
      console.log(ref.offsetLeft);
      if (
        ref.offsetLeft > this.containerWidth() - this.boxWidth() ||
        ref.offsetLeft < 0
      ) {
        this.panIntoView(index);
      }
    }
  }

  containerWidth = () => {
    return this.container.clientWidth;
  };

  boxWidth = () => {
    return this.container.clientWidth * (THUMBNAIL_WIDTH_PCT / 100);
  };

  panIntoView = index => {
    const { first, second } = this.sentinels();
    const dl = ringDistance(first, index, this.props.maxIndex + 1);
    const dr = ringDistance(second, index, this.props.maxIndex + 1);

    console.log(first, second, dl, dr);
    if (dl >= dr) {
      this.setState(
        {
          relativeLeft: this.state.relativeLeft - this.boxWidth() - MARGIN
        },
        this.updateBalance
      );
    } else {
      //right
      this.setState(
        {
          relativeLeft: this.state.relativeLeft + this.boxWidth() + MARGIN
        },
        this.updateBalance
      );
    }
  };

  sentinels = () => {
    let first = 0;
    let second = 0;

    let minOffset = 1e6;
    let maxOffset = -1e6;

    for (let i = 0; i <= this.props.maxIndex; i++) {
      const offset = this.thumbnailById(i).offsetLeft;
      if (offset < this.containerWidth() && offset > maxOffset) {
        maxOffset = offset;
        second = i;
      }
    }
    return {
      first: second - PRESENT_ON_SCREEN + 1,
      second
    };
  };

  componentDidMount = () => {
    if (this.container) {
      const width = this.container.clientWidth * 0.15;
    }
    const balancedIndices = [];
    for (let index = 0; index <= this.props.maxIndex; index++) {
      balancedIndices.push(index);
    }

    this.setState({
      balancedIndices
    });
  };

  thumbnailById = index => {
    return document.getElementById(`ev-thindex-${index}`);
  };

  startDrag = evt => {
    this.setState({ isDragging: true, startDragX: clientXFromEvent(evt) });
  };

  cancelDrag = evt => {
    if (this.state.isDragging) {
      this.setState({
        isDragging: false,
        relativeLeft: this.state.dragX + this.state.relativeLeft,
        dragX: 0
      });
    }
  };

  handleDrag = evt => {
    if (this.state.isDragging) {
      const dragX = clientXFromEvent(evt) - this.state.startDragX;
      this.setState({ dragX });
      this.updateBalance();
    }
  };

  updateBalance = () => {
    let balanced = this.state.balancedIndices;
    if (this.needsToDrop()) {
      balanced.push(balanced.shift());
      this.setState({
        relativeLeft: this.state.relativeLeft + this.boxWidth() + MARGIN
      });
    } else if (this.needsToGain()) {
      balanced = [balanced[balanced.length - 1]].concat(
        balanced.slice(0, balanced.length - 1)
      );
      this.setState({
        relativeLeft: this.state.relativeLeft - (this.boxWidth() + MARGIN)
      });
    }

    this.setState({ balancedIndices: balanced });
  };

  needsToGain = () => {
    let gainRequired = false;
    const id = this.state.balancedIndices[0];
    const thumbnailRef = this.thumbnailById(id);
    if (thumbnailRef) {
      gainRequired = thumbnailRef.offsetLeft > MARGIN * 2;
    }

    return gainRequired;
  };

  needsToDrop = () => {
    let dropRequired = false;
    for (let index = 0; index <= this.props.maxIndex; index++) {
      const thumbnailRef = this.thumbnailById(index);

      if (thumbnailRef) {
        if (thumbnailRef.offsetLeft < -this.boxWidth()) {
          dropRequired = true;
        }
      }
    }

    return dropRequired;
  };

  goToIndex = index => {
    this.props.goToIndex(index);
  };

  render() {
    const childrenArray = React.Children.toArray(this.props.children);
    const children = this.state.balancedIndices.map(
      index => childrenArray[index]
    );

    return (
      <div
        className='ev-thumbnail-reel'
        onMouseDown={this.startDrag}
        onMouseMove={this.handleDrag}
        onMouseUp={this.cancelDrag}
        onTouchStart={this.startDrag}
        onTouchCancel={this.cancelDrag}
        onTouchEnd={this.cancelDrag}
        onTouchMove={this.handleDrag}
        onMouseLeave={this.cancelDrag}
        ref={container => {
          this.container = container;
        }}
      >
        {React.Children.map(children, (child, index) => {
          const left =
            '' +
            (this.state.dragX +
              this.state.relativeLeft +
              this.state.offscreenLeft) +
            'px';

          const active = this.props.index === this.state.balancedIndices[index];
          let className = undefined;
          if (active) {
            className = 'active';
          }

          return React.cloneElement(child, {
            left,
            id: `ev-thindex-${this.state.balancedIndices[index]}`,
            className,
            mouseDown: evt => {
              this.setState({ clientXOnSelection: clientXFromEvent(evt) });
            },
            mouseUp: evt => {
              if (
                Math.abs(
                  this.state.clientXOnSelection - clientXFromEvent(evt)
                ) <= DRAG_TOLERANCE
              ) {
                this.goToIndex(this.state.balancedIndices[index]);
              }
            }
          });
        })}
      </div>
    );
  }
}
