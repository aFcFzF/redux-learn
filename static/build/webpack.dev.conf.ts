/**
 * @file webpack.dev.conf.ts
 * @author afcfzf(9301462@qq.com)
 */

import merge from 'webpack-merge';
import 'webpack-dev-server';
import base from './webpack.base.conf';
// @ts-ignore
import FriendlyErrorsPlugin from '@soda/friendly-errors-webpack-plugin';

import { devPort } from './common.config.json';

const DEV_CONF = merge(base, {
  devServer: {
    compress: true,
    host: '0.0.0.0',
    port: devPort,
    allowedHosts: 'all',
    client: {
      overlay: {
        runtimeErrors: false,
      },
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/(.*)/, to: '/index.html' },
      ],
    },
  },

  mode: 'development',

  devtool: 'source-map',

  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running here: http://127.0.0.1:8838'],
        notes: [],
      },
      onErrors(_: unknown, errors: string) {
        console.error(errors);
      },
    }),
  ],

  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
});

export default DEV_CONF;
