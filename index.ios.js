/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
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
      <View style={[styles.container, this.border("white")]}>
        <View style={[styles.header, this.border("yellow")]}>
          <View style={[styles.timerView, this.border("red")]}>
            <Text>
            {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonView, this.border("green")]}>
            <TouchableHighlight
              underlayColor="gray"
              onPress={this.handleStartPress}
              style={styles.button}>
                <Text>{this.state.running ? "Stop" : "Start"}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="gray"
              onPress={this.handleLapPress}
              style={styles.button}>
              <Text>Lap</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.footer, this.border("blue")]}>
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
    return (
      <Text>
        {formatTime(rowData)}
      </Text>
    );
  },

  handleStartPress : function() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
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
    this.setState({
      startTime : new Date(),
      laps : this.state.laps.concat([this.state.timeElapsed]),
      dataSource : ds.cloneWithRows(this.state.laps)
    })
  },

  border : function(color) {
    return {
      borderColor : color,
      borderWidth : 4
    }
  }
});

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
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
