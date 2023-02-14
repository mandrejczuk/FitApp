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
    <View>
      <Text>{timerOn ? 'xd':'co'}</Text>
      <View style={styles.row}>
        <Text>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Text>
        <Text>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Text>
        <Text>{("0" + ((time / 10) % 100)).slice(-2)}</Text>
      </View>
      <View style={styles.buttons}>
      {!timerOn && time === 0 && (
          <Button onPress={() => setTimerOn(true)}>Start</Button>
        )}
        {timerOn && <Button onPress={() => setTimerOn(false)}>Stop</Button>}
         {!timerOn && time > 0 && ( 
          <Button onPress={() => setTime(0)}>Reset</Button>
         )}
    
         {!timerOn && time > 0 && (
          <Button onPress={() => setTimerOn(true)}>Resume</Button>
         )}
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
