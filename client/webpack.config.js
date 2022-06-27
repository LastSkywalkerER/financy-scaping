import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import HTMLwebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import path, { dirname } from 'path'
import process from 'process'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
// import Dotenv from 'dotenv';

// const dotenv = Dotenv.config({ path: __dirname + '/.env' });

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()]
  }

  return config
}

const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.tsx',
  },
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  mode: 'development',
  devServer: {
    open: '/',
    port: 5500,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
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
            presets: ['@babel/env'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-typescript'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/preset-react',
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLwebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, '../dist/assets'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(dotenv.parsed),
    // }),
  ],
}
