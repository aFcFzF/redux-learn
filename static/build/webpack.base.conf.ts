/**
 * @file 基础配置
 */

import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration, DefinePlugin, RuleSetUseItem } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import commonConfig from './common.config.json';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const resolve = (...args: string[]): string => path.resolve(__dirname, ...args);

const getLessLoader = (cssMod = false): RuleSetUseItem[] => [
  IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
  cssMod ? '@teamsupercell/typings-for-css-modules-loader' : '',
  {
    loader: 'css-loader',
    options: {
      modules: cssMod && {
        localIdentName: '[name]__[local]___[hash:base64:5]',
        exportLocalsConvention: 'camelCaseOnly',
      },
    },
  },
  {
    loader: 'less-loader',
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  },
  {
    loader: 'style-resources-loader',
    options: {
      patterns: [ // 只有一条时也可以写成对象形式
        path.resolve(__dirname, '../src/common/style/index.global.less'),
      ],
      injector: 'append', // 如果在样式文件之后导入就加此行配置
    },
  },
].filter(Boolean);

const CONFIG: Configuration = {
  context: path.resolve(__dirname, '../'),

  entry: {
    app: resolve('../src/app.tsx'),
  },

  output: {
    ...commonConfig.output,
    filename: '[name].[chunkhash].js',
    path: resolve('../docs'),
    assetModuleFilename: `${commonConfig.assetsPath}/[hash][ext][query]`,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.ttf'],
    alias: {
      '@src': resolve('../src'),
      '@': path.resolve(__dirname, '../src'),
    },
    plugins: [
      new TsconfigPathsPlugin({}),
    ],
    fallback: { url: false },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        include: [
          resolve('../src/'),
          resolve('../types/'),
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.global\.less$/,
        include: resolve('../src/'),
        use: getLessLoader(true),
      },
      {
        test: /\.global\.less$/,
        use: getLessLoader(false),
      },
      {
        test: /\.css$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
      __DEV__: JSON.stringify(IS_DEV),
      __ENV__: JSON.stringify(process.env.NODE_ENV),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
    new WebpackManifestPlugin({}),
    new HtmlWebpackPlugin({
      title: 'redux-learn',
      filename: 'index.html',
      chunks: ['app'],
      template: path.join(__dirname, 'template.html'),
      inject: true,
    }),
  ],
};

export default CONFIG;
