import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import LandingPage from './components/LandingPage';
import Panorama from './components/Panorama';
import Loading from './components/Loading';

interface Props {}

interface State {}

class App extends Component<Props, State> {
  componentDidMount() {}

  render() {
    return [<GlobalStyle key={0} />, <LandingPage />];
  }
}

const GlobalStyle = createGlobalStyle`
* {
  font-family: sans-serif;
}

@font-face {
    font-family: 'Bodoni Sans Text';
    src: url('jason_vandenberg_-_bodoni_sans_text_bold-webfont.woff2') format('woff2'),
         url('jason_vandenberg_-_bodoni_sans_text_bold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Bodoni Sans';
    src: url('jason_vandenberg_-_bodoni_sans_display_light-webfont.woff2') format('woff2'),
         url('jason_vandenberg_-_bodoni_sans_display_light-webfont.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'Bodoni Sans';
    src: url('jason_vandenberg_-_bodoni_sans_bold-webfont.woff2') format('woff2'),
         url('jason_vandenberg_-_bodoni_sans_bold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Bodoni Sans';
    src: url('jason_vandenberg_-_bodoni_sans-webfont.woff2') format('woff2'),
         url('jason_vandenberg_-_bodoni_sans-webfont.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}

html, body {
  margin: 0;
  padding: 0;
  background: #f7f8fc;
  background-size: cover;

  * { 
    overflow: hidden;
  }

  font-family: 'Bodoni Sans'
}
`;

export default App;
