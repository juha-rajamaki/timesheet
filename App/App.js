
import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, TextInput } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

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
        <Grid>
          <Row style={styles.headrow}>
            <Text style={styles.header}>TimeSheet</Text>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <Button
                onPress={this.start}
                title="Start"
                color="green"
                accessibilityLabel="Start"
              />
            </Col>
            <Col style={styles.col}>
              <Button
                style={styles.button}
                onPress={this.stop}
                title="Stop"
                color="red"
                accessibilityLabel="Stop"
              />
            </Col>
            <Col>
              <TextInput
                style={styles.textinput}
                placeholder="Give project name"
                onChangeText={(project) => this.setState({project})}
              />
            </Col>
          </Row>
          <Row>
            <Col style={styles.coldate}><Text style={styles.text}>{this.state.currentdate}</Text></Col>
            <Col style={styles.coltime}><Text style={styles.text}>{this.state.currenttime}</Text></Col>
            <Col style={styles.coltime}><Text style={styles.text}>{this.state.hours}:{this.state.minutes}.{this.state.seconds}</Text></Col>
            <Col><TextInput
                placeholder="Give project name"
                onChangeText={(project) => this.setState({project})}
              />
            </Col>
          </Row>
        </Grid>  
      </View>
    );
  }
}

const styles = {
  button: {borderRadius: 40, borderWidth: 3.5},
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  headrow: { height: 40 },
  header: { fontSize: 19, fontWeight: 'bold'},
  row: {  height: 60  },
  col: {  width: 60 },
  coldate: { width: 60},
  coltime: { width: 40},
  text: { textAlign: 'left' },
  textinput: {height: 40, paddingLeft: 10, marginLeft: 10 }
};