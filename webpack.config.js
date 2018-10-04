const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let cleanFolderInit = {
  target: [
    'build',
    'dist'
  ],
  options: {
    root: path.resolve('./'),
    verbose: true,
    // exclude: ['*.html']
  }
}

let mainPath = './resources/demo/';

module.exports = {
  entry: {
    main: `${mainPath}entry.js`
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'frameline.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      cleanFolderInit.target,
      cleanFolderInit.options
    ),
    new CopyWebpackPlugin([
      {
        from: `${mainPath}images/`,
        to: './images/',
        force: true
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: 'index.html',
      template: path.resolve(__dirname, `${mainPath}index.html`),
      inject: true
    }),
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    open: true,
    openPage: 'index.html',
    compress: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, './resources/demo/'),
    port: 3000
  }
};