/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var stopwatch = require('./render.js')
var {
  AppRegistry,
} = React;

AppRegistry.registerComponent('stopwatch', () => stopwatch);
