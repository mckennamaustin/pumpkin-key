import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import LandingPage from './components/LandingPage';
import Panorama from './components/Panorama';

interface Props {}

interface State {}

class App extends Component<Props, State> {
  componentDidMount() {}

  render() {
    return [<GlobalStyle key={0} />, <LandingPage />];
  }
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Srisakdi');
* {
  font-family: sans-serif;

}
html, body {
  margin: 0;
  padding: 0;
  background: #f7f8fc;
  background-size: cover;

  * { 
    overflow: hidden;
  }
}
`;

export default App;
