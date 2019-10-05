const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let initProject = {
  openPage: 'index',
  pages: ['frameline']
};

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
}

let baseConfig = {
  //載入檔案入口
  entry: {
    [`${initProject.pages[0]}`]: path.resolve(__dirname, './resources/entry.js'),
  },
  //打包輸出
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ]
      },
      {
        // Sass-loader + css-loader
        test: /\.(sa|sc|c)ss$/,
        use: [
     
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',
            options: { 
              url: false 
            } 
          },
          'sass-loader'
        ]
      }
    ]
  },
  //額外外掛功能
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
      filename: 'css/frameline.css',
      chunkFilename: '[id].css'
    }),
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    writeToDisk: true,
    open: true,
    openPage: `./${initProject.openPage}.html`,
    compress: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, './resources/'),
    port: 3000
  }
}

//Multiple Pages Build.
initProject.pages.map(function(proName) {
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      chunks: [`${proName}`],
      template: path.resolve(__dirname, './resources/index.html'),
      filename: './demo.html',
      inject: false
    })
  );
});

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    baseConfig.optimization = {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }
  }

  return baseConfig;
}