const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.js');

const config = {

  module: {
    rules: [
      {
        test: /\.s[c|a]ss$/,
        use: [
          'style-loader',
           // Translates CSS into CommonJS
          'css-loader',
           // Compiles Sass to CSS
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `./app/template.html`,
      filename: 'index.html',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 9090,
    host: 'localhost',
    historyApiFallback: true
  }
};


module.exports = merge(baseConfig, config);