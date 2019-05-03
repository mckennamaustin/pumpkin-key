const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const modeConfig = env => require(`./build-scripts/webpack.${env.mode}`);

/*output: {
  path: path.join(__dirname, '/lib'),
  filename: './ev-carousel-pro.js',
  library: 'ev-carousel-pro',
  libraryTarget: 'umd',
  umdNamedDefine: true
},
devtool: 'inline-source-map',*/

module.exports = ({
  mode,
  presets
} = {
  mode: 'production',
  presets: []
}) => {
  return webpackMerge({
      mode: mode,
      entry: {
        'ev-carousel-pro': './src/Carousel.jsx',
        'ev-carousel-pro.min': './src/Carousel.jsx'
      },
      output: {
        path: path.resolve(__dirname, '_bundles'),
        filename: '[name].js',
        library: 'Carousel',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
      },
      devtool: 'source-map',
      devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader'
            }]
          },
          {
            test: /\.js$/,
            use: 'babel-loader'
          },
          {
            test: /\.(s*)css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
      plugins: [new webpack.ProgressPlugin()]
    },
    modeConfig({
      mode,
      presets
    })
  );
};