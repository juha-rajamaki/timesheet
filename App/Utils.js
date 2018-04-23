import React, { Component } from 'react';
import { Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


export class Db{

  static saveUserToDb(user){
    console.log( 'saveUserToDb', user );
  }
  
  static fetchUsersFromDb(id){
    console.log( 'fetchUsessssrsFromDb', id );
    let api = 'https://dino-timesheet-testi.herokuapp.com/api/user/';
    fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        userid : id
      },
    }).then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
    });
  }

  static saveProjectToDb(project){
    console.log( 'saveProjectToDb', user );
  }
  
  static fetchProjectsFromDb(id = false){
    console.log( 'fetchProjectsFromDb', id );
  }

  static saveTimesheetToDb(data){
    fetch('https://dino-timesheet-testi.herokuapp.com/api/timesheet/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: data['project'],
        starttime: data['starttime'],
        endtime: data['endtime'],
        notes: data['notes']
      }),
    }).then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log( 'saveTimesheetToDb json');
      console.log(json);
    });
  }
 
  /**
   * Default fetch all timesheet items
   * @param array options 
   */
  static fetchTimesheetFromDb(options=[]){
    fetch('https://dino-timesheet-testi.herokuapp.com/api/timesheet/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.json().then(function(data){
        let rows = [];
        rows = data.map(function(timesheet) {
          rows.push( {starttime: timesheet.starttime, project: timesheet.project});
        });
        console.log(rows);
      });
    });
  }
}

export class Formatted{

    /**
     * @param Date, now as default
     * @return Date in format: dd.MM.YYYY
     */
    static formattedDate( date = new Date()){
      let formattedDate = date.getDate()+'.'+(date.getMonth()+1) +'.'+date.getFullYear();
      return formattedDate;
    }

    /**
     * @param Date, now as default
     * @return Time in format: hh.mm
     */
    static formattedTime(date = new Date()){
      let minutes = (date.getMinutes() < 10) ? '0'+date.getMinutes():date.getMinutes();
      let hours = (date.getHours() < 10) ? '0'+date.getHours():date.getHours();
      let formattedTime = hours+':'+minutes;
      return formattedTime;
    }

    /**
     *  Duration in milliseconds
     * @return formatted duration hh:mm as string 
     */
    static formattedDuration( time ){
      let seconds = Math.floor(time%60); 
      let minutes = Math.floor((time/60)%60);
      let hours = Math.floor(time/(60*60)%24);
      minutes = (minutes < 10) ? '0' + minutes:minutes;
      hours = (hours < 10) ? '0' + hours:hours;
      let formattedDuration = hours.toString() + ':' + minutes.toString() + '.'+seconds.toString();
      return formattedDuration;
    }
}


export class TimesheetRow extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
    }
  
    render() {
      return (
        <Row>
          <Col><Text>{this.props.starttime}</Text></Col>
          <Col><Text>{this.props.duration}</Text></Col>
          <Col><Text>{this.props.project}</Text></Col>
          <Col><Text>{this.props.notes}</Text></Col>
        </Row>
    )}
  }
  
  export class TimesheetTable extends React.Component {
    render() {
      const rows = [];
      /*
      let result = Db.fetchTimesheetFromDb();
      result.then((timesheets) => {
        timesheets.map((timesheet)=> {
          console.log(timesheet);
          rows.push(
            <TimesheetRow key={timesheet._id} starttime={timesheet.starttime} duration={timesheet.endtime} project={timesheet.project} notes={timesheet.notes} />
          );
        })
      });*/
      return (
        <Row>
          <Col>
            <Row style={styles.timesheet_headrow}>
              <Col><Text style={styles.timesheet_headrow}>Start</Text></Col>
              <Col><Text style={styles.timesheet_headrow}>Duration</Text></Col>
              <Col><Text style={styles.timesheet_headrow}>Project</Text></Col>
              <Col><Text style={styles.timesheet_headrow}>Notes</Text></Col>
            </Row>
            {rows}
          </Col>
        </Row>
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
    timesheet_headrow: { height: 30 },
    header: { fontSize: 19, fontWeight: 'bold'},
    timesheet_header: { fontSize: 16, fontWeight: 'bold'},
    row: {  height: 60  },
    col: {  width: 60 },
    coldate: { width: 60},
    coltime: { width: 40},
    text: { textAlign: 'left' },
    textinput: {height: 40, paddingLeft: 10, marginLeft: 10 }
  };