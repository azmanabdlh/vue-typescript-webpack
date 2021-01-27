const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const config = {
  entry: './app/index.ts',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name]-[contenthash].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './app')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-template-loader',
        exclude: /template.html/
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  }
};

module.exports = config;