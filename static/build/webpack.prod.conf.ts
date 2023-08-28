/**
 * @file webpack 开发配置
 */

import merge from 'webpack-merge';
import webpack from 'webpack';
import base from './webpack.base.conf';
import TerserPlugin from 'terser-webpack-plugin';

const PROD_CONF: webpack.Configuration = merge(base, {
  mode: 'production',

  output: {
    sourceMapFilename: './sourcemap/[file].map[query]',
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          // 现网不要console和debugger
          drop_console: true,
          drop_debugger: true,
        },
      },
    })],
    noEmitOnErrors: true,
    // 开启则需要将分片也引入
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
});

export default PROD_CONF;
