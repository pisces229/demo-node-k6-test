const path = require('path');
const fs = require('fs');
const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const entryMap = {};

fs.readdirSync(path.resolve(__dirname, 'src/'))
.filter(file => {
  return file.match(/.*\.ts$/);
})
.forEach(f => {
  entryMap[f.replace(/\.ts$/, '')] = ['./src/' + f];
});

module.exports = {
  mode: 'development',
  entry: entryMap,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  'useBuiltIns': 'usage',
                  'corejs': 3
                }
              ],
              '@babel/typescript', 
            ],
            plugins: ['@babel/plugin-transform-runtime'],
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      process: {
        env: {
          TEST_URL: '"https://test.k6.io"',
        },
      },
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  stats: {
    colors: true,
    warnings: false,
  },
  target: 'node',
  externals: [/k6(\/.*)?/],
  // devtool: 'source-map',
}