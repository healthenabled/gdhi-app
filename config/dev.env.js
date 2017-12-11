'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MAP_KEY: '"AIzaSyDuALs75XmG9G0cJPSbYZyMHj8k46akA80"'
})
