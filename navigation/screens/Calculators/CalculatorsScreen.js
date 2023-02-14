import * as React from 'react'
import  { useState } from 'react';
import { Platform } from 'react-native';
import {View, Text, NativeBaseProvider, StatusBar} from 'native-base'
import {Picker} from '@react-native-picker/picker'
import { render } from 'react-dom/cjs/react-dom.production.min';
import Dropdown from './CalculatorsDropdown';
import CalculatorsSelect from './CalculatorsSelect';
import Example from './CalculatorsSelect'
import BMIScreen from "./BMIScreen";
import ORMScreen from "./ORMScreen";
import SetCounterScreen from './SetCounterScreen';
import StopwatchScreen from './StopWatchScreen';

function  CalculatorsScreen()
{
    
    
    const [calc, setCalc] = useState();

    return(
        <NativeBaseProvider>
        <View   onPress={() => navigation.navigate('Home')} style={{ flex: 1, paddingTop: 18}} safeAreaTop='28'>
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