import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './public/index.js'
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'public'),
        loaders: [{
          loader: 'babel-loader',
          options: { presets: ['babel-preset-env', 'babel-preset-react'] }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}
