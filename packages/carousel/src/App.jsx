import React, { Component } from 'react';
import Carousel from './Carousel';

import './style.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Carousel />
      </div>
    );
  }
}
