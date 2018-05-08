
import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {TimesheetRow, TimesheetTable, Formatted, Timer, Db} from './Utils';
import { Icon } from 'react-native-elements'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			time: 0,
			intervalId: false,
      projectname: '',
      currenttime: Formatted.formattedTime(),
      currentdate: Formatted.formattedDate(),
      starttime: false,
      projectid: 1,
      notes: false,
      refreshing: false,
    }
    
	  this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.refresh = this.refresh.bind(this);
    let options = {};
	}

   /**
   * Starts timer
   */
	start() {
    if( !this.state.intervalId ){
		var intervalId = setInterval(() => {
		  this.setState({ 
        currenttime: Formatted.formattedTime(),
        projectid: this.state.projectid + 1,
        starttime: new Date(),
        intervalId: intervalId, 
        time: this.state.time + 1,})
        this.tick();
        }, 1000)
	  }    
	}


  /**
   * Stops timer and saves project to database
   */
	stop() {
	  if( this.state.intervalId ){
      let starttime = Formatted.formattedDate(this.state.starttime)+' '+Formatted.formattedTime(this.state.starttime);
      let endtime = new Date();
      const timesheet = {
        project: this.state.projectname,
        notes: this.state.notes,
        endtime: new Date(),
        starttime: this.state.starttime
      }

      // Save project data to DB
      Db.saveTimesheetToDb( timesheet );

      clearInterval(this.state.intervalId);
      this.setState({   
        projectname:'',
        notes:'',
        time: 0,
        intervalId: false,
        refreshing: true })
      }
	}

  refresh() {
    this.forceUpdate();
  }

	tick () {
    let time = this.state.time;
      if( time > 0){
        this.setState({
          time: time,
        })
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
            <Col style={styles.colbutton}>
              <Icon
                name='play-circle-filled'
                size={45}
                color='green'
                onPress={this.start}
              />
            </Col>
            <Col style={styles.colbutton}>
              <Icon
                name='pause-circle-filled'
                size={45}
                color='red'
                onPress={this.stop}
              />
            </Col>
            <Col><Text style={styles.text_big}>{this.state.currenttime}</Text></Col>
            <Col><Text style={styles.text_big}>{Formatted.formattedDuration(this.state.time)}</Text></Col>
          </Row>
          <Row style={styles.row}>
            <Col>
              <TextInput
                style={styles.textinput}
                placeholder="Give project name"
                onChangeText={(projectname) => this.setState({projectname})}
              />
            </Col>
            <Col>
              <TextInput
                style={styles.textinput}
                placeholder="Give notes"
                onChangeText={(notes) => this.setState({notes})}
              />
            </Col>
          </Row>
          <ScrollView>
            <TimesheetTable refresh={this.state.refreshing}/>
          </ScrollView>
        </Grid>  
      </View>
    );
  }
}

const styles = {
  button: {borderRadius: 40, borderWidth: 3.5},
  small_button: {borderRadius: 40, borderWidth: 3.5, width: 30,height: 30 },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  headrow: { height: 40 },
  project_headrow: { height: 30 },
  header: { fontSize: 19, fontWeight: 'bold'},
  project_header: { fontSize: 16, fontWeight: 'bold'},
  row: {  height: 60  },
  col: {  width: 60 },
  colbutton: {  width: 70 },
  coldate: { width: 60},
  coltime: { width: 40},
  text: { textAlign: 'left' },
  text_big: { textAlign: 'left', fontSize: 25, marginBottom: 0 },
  textinput: {height: 40, paddingLeft: 10, marginLeft: 10 }
};