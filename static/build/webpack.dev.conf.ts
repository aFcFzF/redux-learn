/**
 * @file webpack.dev.conf.ts
 * @author afcfzf(9301462@qq.com)
 */

import merge from 'webpack-merge';
import 'webpack-dev-server';
import { SourceMapDevToolPlugin } from 'webpack';
import base from './webpack.base.conf';

// @ts-ignore
import FriendlyErrorsPlugin from '@soda/friendly-errors-webpack-plugin';

const DEV_CONF = merge(base, {
  devServer: {
    compress: true,
    host: '0.0.0.0',
    port: 8787,
    allowedHosts: 'all',
  },

  mode: 'development',

  devtool: 'cheap-module-source-map',

  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running here: http://127.0.0.1:8787'],
        notes: [],
      },
      onErrors(_: unknown, errors: string) {
        console.error(errors);
      },
    }),
    new SourceMapDevToolPlugin({
      moduleFilenameTemplate(info: any) {
        return `file://${info.absoluteResourcePath}`;
      },
    }),
  ],

  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: ['./build'],
  },
});

export default DEV_CONF;
