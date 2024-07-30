const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production'; // Determine mode based on environment variable

module.exports = {
  entry: './Client/index.js',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
    publicPath: '/',
  },
  // Module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ['babel-plugin-styled-components']
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // Module resolution configuration
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'client/src'), 'node_modules'],
  },
  // Plugins for additional build steps
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: true,
    }),
    new Dotenv(),
    isProduction && new webpack.ids.HashedModuleIdsPlugin(), // Use HashedModuleIdsPlugin for long term caching
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: isProduction ? [new TerserPlugin(), new CssMinimizerPlugin()] : [],
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // Minimum size, in bytes, for a chunk to be generated
      maxSize: 70000, // Maximum size, in bytes, for a chunk to be generated
      minChunks: 1, // Minimum number of chunks that must share a module before splitting
      maxAsyncRequests: 30, // Maximum number of parallel requests for on-demand loading
      maxInitialRequests: 30, // Maximum number of parallel requests at an entry point
      automaticNameDelimiter: '~', // Delimiter for generated names
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    usedExports: true, // Enable tree shaking
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'client/public'), // Ensure access to static files in the public directory
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3003',
        logLevel: 'info',
      },
    ],
  },
};
