const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  mode: 'production',

  entry: {
    app: './app/scripts/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  devServer: {
    port: 3003,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.pug',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'initial',
    },
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.webmanifest$/,
        include: /assets\//,
        use: ['file-loader', 'webmanifest-loader'],
      },
    ],
  },
};

module.exports = (env, argv) => {
  // if (argv.mode === 'development') {
  // }
  // if (argv.mode === 'production') {
  // }

  return config;
};
