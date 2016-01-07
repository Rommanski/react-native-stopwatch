var React = require('react-native');
var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
  },

  footer: {
    flex: 1,
  },

  timerView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  timer: {
    fontSize: 60
  },

  startButton: {
    borderColor: '#00CC00'
  },

  stopButton: {
    borderColor: '#CC0000'
  },

  buttonText : {
    fontSize: 35
  },

  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  lapText: {
    fontSize: 30
  }
});

module.exports = styles;
