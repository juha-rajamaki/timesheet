
import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class ProjectRow extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Row>
        <Col><Text>{this.props.starttime}</Text></Col>
        <Col><Text>{this.props.duration}</Text></Col>
        <Col><Text>{this.props.name}</Text></Col>
      </Row>
  )}
}

class ProjectTable extends React.Component {
  render() {
    const rows = [];
    this.props.projects.forEach((project) => {
      rows.push(
        <ProjectRow key={project.id} starttime={project.starttime} duration={project.duration} name={project.name} notes={project.notes} />
      );
    });
    return (
      <Row>
        <Col>
          <Row style={styles.project_headrow}>
            <Col><Text style={styles.project_header}>Start</Text></Col><Col><Text style={styles.project_header}>Duration</Text></Col><Col><Text style={styles.project_header}>Name</Text></Col>
          </Row>
          {rows}
        </Col>
      </Row>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			time: 0,
			intervalId: false,
      projectname: '',
      currenttime: this.formattedTime(),
      currentdate: this.formattedDate(),
      starttime: false,
      projects: []
	  }
	  this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
	}

  /**
   * Starts timer
   */
	start() {
    if( !this.state.intervalId ){
		var intervalId = setInterval(() => {
		  this.setState({ 
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
      let starttime = this.formattedDate(this.state.starttime)+' '+this.formattedTime(this.state.starttime);
      let endtime = new Date();
      const project = {
        id: this.state.projectid,
        name: this.state.projectname,
        duration: this.formattedDuration(this.state.time),
        starttime: starttime,
        notes: 'notes',
      }
      
      this.setState({
        projects: [...this.state.projects, project]
      })

      // Save project data to DB
      this.saveToDb( project );
      
      clearInterval(this.state.intervalId);
      this.setState({ 
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

  /**
   * @param Date, now as default
   * @return Date in format: dd.MM.YYYY
   */
  formattedDate( date = new Date()){
    let formattedDate = date.getDate()+'.'+(date.getMonth()+1) +'.'+date.getFullYear();
    return formattedDate;
  }

  /**
   * @param Date, now as default
   * @return Time in format: hh.mm
   */
  formattedTime(date = new Date()){
    let minutes = (date.getMinutes() < 10) ? '0'+date.getMinutes():date.getMinutes();
    let hours = (date.getHours() < 10) ? '0'+date.getHours():date.getHours();
    let formattedTime = hours+':'+minutes;
    return formattedTime;
  }

  /**
   *  Duration in milliseconds
   * @return formatted duration hh:mm as string 
   */
  formattedDuration( time ){
    let seconds = Math.floor(time%60); 
    let minutes = Math.floor((time/60)%60);
    let hours = Math.floor(time/(60*60)%24);
    minutes = (minutes < 10) ? '0' + minutes:minutes;
    hours = (hours < 10) ? '0' + hours:hours;
    let formattedDuration = hours.toString() + ':' + minutes.toString() + '.'+seconds.toString();
    return formattedDuration;
  }

  saveToDb(project){
    /*
    app.get('http://localhost:3000/api/timesheet', (request, response) => {
      Times
        .find({})
        .then(times => {
          response.json()
        })
    })

    
    {
      "project": "worklogger",
      "starttime": "Mon Feb 12 2018 11:33:00 GMT+0100 (CET)",
      "endtime": "Mon Feb 12 2018 12:43:00 GMT+0100 (CET)",
      "Notes": "third Entry"
    }*/

//    project: String,
//    starttime: Date,
//    endtime: Date,
//    Notes: String
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
          </Row>
          <Row style={styles.row}>
            <Col><Text style={styles.text}>{this.state.currentdate} {this.state.currenttime}</Text></Col>
            <Col><Text style={styles.text}>{this.formattedDuration(this.state.time)}</Text></Col> 
            <Col><Text style={styles.text}>{this.state.projectname}</Text></Col>        
          </Row>
          <ScrollView>
            <ProjectTable projects={this.state.projects}/>
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