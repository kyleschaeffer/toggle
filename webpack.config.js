const path = require('path');

const DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  entry: [
    './src/toggle.js'
  ],
  output: {
    filename: 'toggle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env'
            ]
          }
        }
      }
    ]
  }
};
