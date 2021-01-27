const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.config.js');

const config = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.s[c|a]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          regExp: /(fonts\/.*)/,
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app-[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardUnused: false,
        discardComments: { removeAll: true }
      }
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './app/template.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};


module.exports = merge(baseConfig, config);