var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  contentApi: "http://127.0.0.1/jsonblog/jsonapi",
  NODE_ENV: '"development"'
})
