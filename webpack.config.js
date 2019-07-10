const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let cleanFolderInit = {
  target: [
    'build',
    'dist'
  ],
  options: {
    root: path.resolve('./'),
    verbose: true
    // exclude: ['*.html']
  }
};

let baseCommonTask = {
  entry: {
    vendor: './resources/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        //Eslint-Loader
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          emitError: true
        }
      },
      {
        //Babel-Loader
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
        // Sass-loader + css-loader
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization:{
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(
      cleanFolderInit.target,
      cleanFolderInit.options
    ),
    new CopyWebpackPlugin([
      {
        from: './resources/images/',
        to: './images/',
        force: true
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '/css/[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['vendor'],
      filename: 'demo.html',
      template: path.resolve(__dirname, './resources/demo.html'),
      inject: true
    })
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    open: true,
    openPage: 'demo.html',
    compress: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, './resources/'),
    port: 3000
  }
};

module.exports = (env, argv) => {
  //When Build-mode Active
  if (argv.mode === 'production') {
    baseCommonTask.plugins.push(
      new MergeIntoSingleFilePlugin({
        files: {
          'src/frameline.js': [
            'resources/js/frameline.js'
          ]
        }
      }),
      new WebpackShellPlugin({
        onBuildStart: ['echo Start Create Plugins!!'],
        onBuildEnd: ['./pluginBuild.sh']
      })
    );
  }
  return baseCommonTask;
};
