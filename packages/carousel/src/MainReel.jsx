import React, { Component } from 'react';
import MainImage from './MainImage';
import Icon from './Icon';
import { CHEVRON_LEFT, CHEVRON_RIGHT, PLAY, FULLSCREEN } from './base64';

class MainReel extends Component {
  render() {
    return (
      <div className='ev-main-reel-container'>
        {React.Children.map(this.props.children, child => {
          let className = undefined;
          const visible = false;
          if (visible) {
            className = 'hidden';
          }
          return React.cloneElement(child, {
            visible: visible,
            className
          });
        })}
        <Icon
          className='left'
          src={CHEVRON_LEFT}
          onClick={this.props.decrementIndex}
        />
        <Icon
          className='right'
          src={CHEVRON_RIGHT}
          onClick={this.props.incrementIndex}
        />
        {this.props.label && this.props.label.length > 0 && (
          <div className='ev-carousel-label-container'>
            <span>{this.props.label}</span>
          </div>
        )}
        <span className='exit-button' onClick={this.props.exitCarousel}>
          ×
        </span>
        <div className='ev-carousel-controls-container'>
          <Icon src={FULLSCREEN} onClick={this.props.toggleFullscreen} />
        </div>
      </div>
    );
  }
}

export default MainReel;
