// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
//const testsContext = require.context('./specs', true, /\.spec$/)
const testsContext = require.context('./specs', true)
testsContext.keys().forEach(testsContext)
console.log(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('src', true, /^\.\/(?!main(\.js)?$)/)
//const srcContext = require.context('src', true)
srcContext.keys().forEach(srcContext)
