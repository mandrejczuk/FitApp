import { NativeBaseProvider,  Box,TextArea,Input,View,Text,Heading,Flex, Center, Spacer,HStack, Button } from "native-base";
import * as React from 'react'
import { StyleSheet } from "react-native";


export default function SetCounterScreen()
{
    const [counter,setCounter] = React.useState(0)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
            <Text style={styles.text}>{counter}</Text>
            </View>
            <View style={styles.row}>
            <Button style={styles.countButton} onPress={()=>setCounter(counter+1)} _text={{fontSize:16}}>COUNT</Button>
            <Button style={styles.resetButton} color='red.900' onPress={()=>setCounter(0)}  _text={{fontSize:16}}>RESET</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
  } ,
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textContainer:{
    flex: 2,
  },
  text:{
    flex: 2,
    fontSize: 80,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  countButton:{
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    
  },
  resetButton:{
    backgroundColor: 'red',
    alignSelf: 'flex-start',

  }


})
