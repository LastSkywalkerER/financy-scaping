const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HTMLwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config;
};

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx'
  },
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@db': path.resolve(__dirname, 'db'),
      '@fonts': path.resolve(__dirname, 'fonts'),
      '@img': path.resolve(__dirname, 'img'),
      '@sass': path.resolve(__dirname, 'sass'),
    }
  },
  optimization: optimization(),
  mode: 'development',
  devServer: {
    open: 'D:\\Program Files\\Mozilla Firefox\\firefox.exe',
    port: 8080,
    hot: true,
    writeToDisk: false,
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader',
        ],
      }, {
        test: /\.sass$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader',
          'sass-loader'
        ],
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          },
        },
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLwebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/static'),
        to: path.resolve(__dirname, 'dist/static')
      }]
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
  ]
};