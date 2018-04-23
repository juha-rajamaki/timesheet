
import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {TimesheetRow, TimesheetTable, Formatted, Timer, Db} from './Utils';

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
      timesheets: []
	  }
	  this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    let options = {};
    Db.fetchTimesheetFromDb(options);
    Db.fetchProjectsFromDb();
    Db.fetchUsersFromDb();
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
      const timesheetRow = {
        id: this.state.projectid,
        project: this.state.projectname,
        notes: this.state.notes,
        duration: Formatted.formattedDuration(this.state.time),
        starttime: Formatted.formattedTime(this.state.starttime)
      }

      // Save project data to DB
      Db.saveTimesheetToDb( timesheet );

      this.setState({
        timesheets: [...this.state.timesheets, timesheetRow]
      })

      clearInterval(this.state.intervalId);
      this.setState({ 
        projectname:'',
        notes:'',
        time: 0,
        intervalId: false })
      }
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
          <Row style={styles.row}>
            <Col><Text style={styles.text}>{this.state.currentdate} {this.state.currenttime}</Text></Col>
            <Col><Text style={styles.text}>{Formatted.formattedDuration(this.state.time)}</Text></Col> 
            <Col><Text style={styles.text}>{this.state.projectname}</Text></Col>
            <Col><Text style={styles.text}>{this.state.notes}</Text></Col>              
          </Row>
          <ScrollView>
            <TimesheetTable timesheets={this.state.timesheets}/>
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
  coldate: { width: 60},
  coltime: { width: 40},
  text: { textAlign: 'left' },
  textinput: {height: 40, paddingLeft: 10, marginLeft: 10 }
};