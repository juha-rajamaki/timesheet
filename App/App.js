
import React, { Math, Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, TextInput } from 'react-native';

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
      currentdate: this.currentDate()
	  }
	  this.start = this.start.bind(this)
		this.stop = this.stop.bind(this)
	}

	start() {
    if( !this.state.intervalId ){
		var intervalId = setInterval(() => {
		  this.setState({ 
			intervalId: intervalId, 
      time: this.state.time + 1,
      currenttime: 'this.currentTime()',
      currentdate: 'this.currentDate()' })
			this.tick();
			}, 10)
	  }    
	}

  currentDate(){
    return new Date().toLocaleDateString('fi-FI', { timeZone: 'UTC'});
  }

  currentTime(){
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

	stop() {
	  if( this.state.intervalId ){
      clearInterval(this.state.intervalId);
      this.setState({ 
        time: 0, 
        intervalId: false })
      }

      // Save time to DB
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
        <View style={styles.grid}>
            
            <TextInput
                style={{height: 40}}
                placeholder="Give project name"
                onChangeText={(project) => this.setState({project})}
              />
               
              <View style={styles.row}>
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
                 <Text>
                  {this.state.currentdate} {this.state.currenttime} - {this.state.hours}:{this.state.minutes}:{this.state.seconds} 
                  {this.state.project}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
