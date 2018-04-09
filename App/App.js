
import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, TextInput, List, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			time: 1,
			intervalId: false,
			seconds: 0,
			minutes: 0,
      hours: 0,
      project: '',
      currenttime: this.currentTime(),
      currentdate: this.currentDate(),
      starttime: false,
	  }
	  this.start = this.start.bind(this)
		this.stop = this.stop.bind(this)
	}

	start() {
    if( !this.state.intervalId ){
		var intervalId = setInterval(() => {
		  this.setState({ 
        starttime: new Date(),
        intervalId: intervalId, 
        time: this.state.time + 1,
        currenttime: this.currentTime(),
        currentdate: this.currentDate()})
        this.tick();
        }, 1000)
	  }    
	}

  currentDate(){
    var date =  new Date();
    var formattedDate = date.getDate()+'.'+(date.getMonth()+1) +'.'+date.getFullYear()
    return formattedDate
  }

  currentTime(){
    var date =  new Date();
    var minutes = (date.getMinutes() < 10) ? '0'+date.getMinutes():date.getMinutes()
    var hours = (date.getHours() < 10) ? '0'+date.getHours():date.getHours()
    var formattedTime = hours+':'+minutes
    return formattedTime;
  }

	stop() {
	  if( this.state.intervalId ){
      var projectdata = {
        'name': this.state.project,
        'time': this.state.time,
        'starttime': this.state.starttime,
      }
        
      clearInterval(this.state.intervalId);
      this.setState({ 
        time: 0, 
        seconds: 0,
        minutes: 0,
        hours: 0,
        project: '',
        intervalId: false })
      }

      // Save project data to DB
	}

	tick () {
      var time = this.state.time;
      if( time > 0){
        var seconds = Math.floor(time%60); 
        var minutes = Math.floor((time/60)%60);
        var hours = Math.floor(time/(60*60)%24);
        this.setState({
          seconds: seconds,
          minutes: minutes,
          hours: hours})
      }      
	}

  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View>
          <TextInput
                style={{height: 40}}
                placeholder="Give project name"
                onChangeText={(project) => this.setState({project})}
              />
              <Button
                onPress={this.start}
                title="Start"
                color="green"
                accessibilityLabel="Start"
              />
              <Button
                onPress={this.stop}
                title="Stop"
                color="red"
                accessibilityLabel="Stop"
              />
              
            </View>
            <View>    
                <Text>
                {this.state.currentdate} {this.state.currenttime} - {this.state.hours}:{this.state.minutes}:{this.state.seconds}  {this.state.project}
              </Text>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  grid: {
    flex: 1,
    flexDirection: 'column',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
