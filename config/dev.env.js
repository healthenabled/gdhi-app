'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MAP_KEY: '"AIzaSyBBPC6AuPOJuy7vbLnHDwQkIMXdD5fMseI"'
})
