'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap
const merge = require('webpack-merge')


module.exports = {
  loaders: merge({
    ts: 'ts-loader'
  }, utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  })),
  cssSourceMap: sourceMapEnabled,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
