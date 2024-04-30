/* =========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: '/',
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  configureWebpack: {
    module:{
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /plyr\.min\.js$/,
          use: 'raw-loader',
        },
      ],
    },
    // plugins: [new BundleAnalyzerPlugin()],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
};
