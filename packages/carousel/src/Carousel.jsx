import React, { Component } from 'react';
import './carousel.scss';

import MainImage from './MainImage';
import ThumbnailReel from './ThumbnailReel';
import MainReel from './MainReel';
import Thumbnail from './Thumbnail';
import ThumbnailIndicator from './ThumbnailIndicator';

export default class Carousel extends Component {
  state = {
    index: 0,
    thumbnailHops: 0,
    isFullscreen: false,
    isShowingThumbnails: false
  };

  componentDidMount() {
    if (this.props.isFullscreen && !this.state.isFullscreen) {
      this.setState({ isFullscreen: true });
    }
    //    window.addEventListener('keydown');
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.isFullscreen && !this.state.isFullscreen) {
      this.setState({ isFullscreen: true });
    }
  };

  incrementIndex = () => {
    let index = this.state.index + 1;
    if (index > this.props.images.length - 1) {
      index = 0;
    }

    this.setState({ index });

    if (this.props.indexChange) {
      this.props.indexChange(index);
    }
  };

  decrementIndex = () => {
    let index = this.state.index - 1;
    if (index < 0) {
      index = this.props.images.length - 1;
    }

    this.setState({ index });

    if (this.props.indexChange) {
      this.props.indexChange(index);
    }
  };

  goToIndex = index => {
    if (index <= this.props.images.length - 1 && index >= 0) {
      this.setState({ index });
      if (this.props.indexChange) {
        this.props.indexChange(index);
      }
    }
  };

  toggleFullscreen = () => {
    this.setState(
      {
        isFullscreen: !this.state.isFullscreen,
        isShowingThumbnails: false
      },
      () => {
        if (this.state.isFullscreen) {
          window.addEventListener('keydown', this.handleKeyboard);
        } else {
          window.removeEventListener('keydown', this.handleKeyboard);
        }
        this.props.updateFullscreen(this.state.isFullscreen);
      }
    );
  };

  handleKeyboard = evt => {
    if (evt.keyCode === 37) {
      this.decrementIndex();
    } else if (evt.keyCode === 39) {
      this.incrementIndex();
    }
  };

  toggleThumbnails = () => {
    this.setState({
      isShowingThumbnails: !this.state.isShowingThumbnails
    });
  };

  render() {
    return (
      <div
        className={`ev-carousel-container${
          this.state.isFullscreen ? ' fullscreen' : ''
        }${this.state.isShowingThumbnails ? ' show-thumbnails' : ''}`}
      >
        <MainReel
          index={this.state.index}
          decrementIndex={this.decrementIndex}
          incrementIndex={this.incrementIndex}
          toggleFullscreen={this.toggleFullscreen}
          exitCarousel={this.props.exitCarousel}
          label={this.props.label}
        >
          {[<MainImage src={this.props.images[this.state.index].src} />]}
        </MainReel>
        {this.state.isFullscreen && (
          <ThumbnailIndicator
            isShowingThumbnails={this.state.isShowingThumbnails}
            toggleThumbnails={this.toggleThumbnails}
          />
        )}
        <ThumbnailReel
          index={this.state.index}
          goToIndex={this.goToIndex}
          maxIndex={this.props.images.length - 1}
          decrementIndex={this.decrementIndex}
          incrementIndex={this.incrementIndex}
        >
          {this.props.images.map(image => (
            <Thumbnail src={image.thumbnail} />
          ))}
        </ThumbnailReel>
      </div>
    );
  }
}
