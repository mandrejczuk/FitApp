import * as React from 'react'
import  { useState } from 'react';
import {View, Text, NativeBaseProvider, StatusBar} from 'native-base'
import CalculatorsSelect from './CalculatorsSelect';
import BMIScreen from "./BMIScreen";
import ORMScreen from "./ORMScreen";
import SetCounterScreen from './SetCounterScreen';
import StopwatchScreen from './StopWatchScreen';

function  CalculatorsScreen()
{
    
    
    const [calc, setCalc] = useState();

    return(
        <NativeBaseProvider>
        <View   onPress={() => navigation.navigate('Home')} style={{ flex: 1, paddingTop: 30}} safeAreaTop='28'>
           <CalculatorsSelect
           changeCalc= {calc=> setCalc(calc)}
           />
           {calc === "BMI" && <BMIScreen/>}
           {calc === "ORM" && <ORMScreen/>}
           {calc === "SetCounter" && <SetCounterScreen/>}
           {calc === "Stopwatch" && <StopwatchScreen/>}

           
        </View>
        </NativeBaseProvider>
    )
    
}


export default CalculatorsScreen