
import React, { Component, Math } from 'react';
import { StyleSheet, AppRegistry, Text, View, Button } from 'react-native';

var time = 0; 

function tick() {
  time++;
  /*
  var seconds = Math.floor(time%60); 
  var minutes = Math.floor((time/60)%60);
  var hours = Math.floor(time/(60*60)%24);
  const element = (
    <div>
      {hours}:{minutes}.{seconds}
    </div>
  );
*/
  return 'element';
}


class Tick extends Component {
  constructor(props) {
    super(props);
    //this.state = {isCounting: true};
    //this.time++;
  }
  render() {
    let display = tick();
    return (
         
      <Text>'{display}'</Text>
    );
  }
  /*
  startTimer(){
    // Set timer state according to previous state
    this.setState( isCounting => !(isCounting) );
  }*/
}
// Toggle the state every second
setInterval(tick, 1000);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grid}>
            <Text>Timesheet</Text>
              <View style={styles.row}>
                  <Button
                    onPress={tick}
                    title="Start"
                    color="red"
                    accessibilityLabel="Start"
                  />
                  <Tick></Tick>
              </View>
        </View>
        <View style={styles.grid}>
            <Text>Listausta</Text>
              <View style={styles.row}>
                  <Text>Tähän jotain</Text>
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
