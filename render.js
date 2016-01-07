'use strict';

var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var styles = require("./styles.js");
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var stopwatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
      dataSource: ds.cloneWithRows([]),
    }
  },

  render: function() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <View style={[styles.timerView]}>
            <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonView,]}>
            <TouchableHighlight
              underlayColor="gray"
              onPress={this.handleStartPress}
              style={[styles.button, styles.startButton]}>
                <Text style={styles.buttonText}>{this.state.running ? "Stop" : "Start"}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="gray"
              onPress={this.handleLapPress}
              style={[styles.button, styles.stopButton]}>
              <Text style={styles.buttonText}>Lap</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.footer]}>
          {this.listObjects()}
        </View>
      </View>
    );
  },

  listObjects : function() {
    return <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderRow}
    />
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    //console.log(rowId);
    //var lapNumber = parseInt(rowId) + 1
    return (
      <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{rowID}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(rowData)}
        </Text>
      </View>
    );
  },

  handleStartPress : function() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({
        running: false,
        dataSource : ds.cloneWithRows([]),
        laps : [],
      });
      return
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  },

  handleLapPress : function() {
    console.log("Lap tapped");
    if (!this.state.running) {
      return;
    }

    var myLaps = this.state.laps.concat([this.state.timeElapsed])
    this.setState({
      startTime : new Date(),
      laps : this.state.laps.concat([this.state.timeElapsed]),
      dataSource : ds.cloneWithRows(myLaps)
    })
  },

  border : function(color) {
    return {
      borderColor : color,
      borderWidth : 4
    }
  }
});

module.exports = stopwatch;
