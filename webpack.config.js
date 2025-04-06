const path = require('path');

module.exports = {
  entry: './src/react/index.tsx',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'react-app.js',
    library: 'MyReactApp',
    libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

