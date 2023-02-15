import {
  NativeBaseProvider,
  Box,
  TextArea,
  Input,
  View,
  Text,
  Heading,
  Flex,
  Center,
  Spacer,
  HStack,
  Button,
} from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";

export default function StopwatchScreen() {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);



  return (
    <View style={{flex: 1}}>

      <View style={styles.row}>
        <Text style={styles.text}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Text>
        <Text style={styles.text}>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Text>
        <Text style={styles.text}>{("0" + ((time / 10) % 100)).slice(-2)}</Text>
      </View>
      <View style={styles.buttons}>
      {!timerOn && time === 0 && (
        <View style={{flex: 1}}>
          <Button style={styles.buttonStart} onPress={() => setTimerOn(true)}>Start</Button>
          </View>
        )}
        {timerOn && (
        <View style={{flex: 1}}>
        <Button  style={styles.buttonStop} onPress={() => setTimerOn(false)}>Stop</Button>
        </View>
        )}
         {!timerOn && time > 0 && ( 
           <View style={{flex: 1}}>
           <Button style={styles.buttonResume} onPress={() => setTimerOn(true)}>Resume</Button>
           </View>
         )}
    
         {!timerOn && time > 0 && (
             <View style={{flex: 1}}>
             <Button style={styles.buttonReset} onPress={() => setTime(0)}>Reset</Button>
             </View>
         )}
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 2,
    justifyContent: 'center'
  },
  buttons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonStart:{
    backgroundColor: 'green',
    width: '70%',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  buttonStop:{
    backgroundColor: 'red',
    width: '70%',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  text:{
    fontSize: 60,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  buttonReset:{
    width: '70%',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  buttonResume:{
    width: '70%',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'green',
  }
});
