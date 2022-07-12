const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
  externals: [nodeExternals()], // removes node_modules from your final bundle
  entry: './src/renderer/index.ts', // make sure this matches the main root of your code
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'), // this can be any path and directory you want
    filename: 'bundle.js'
  },
  optimization: {
    minimize: false // enabling this reduces file size and readability
  }
};
