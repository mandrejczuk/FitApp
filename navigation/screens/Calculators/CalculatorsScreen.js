import * as React from 'react'
import  { useState } from 'react';
import {View, Text, NativeBaseProvider} from 'native-base'
import {Picker} from '@react-native-picker/picker'
import { render } from 'react-dom/cjs/react-dom.production.min';
import Dropdown from './CalculatorsDropdown';
import CalculatorsSelect from './CalculatorsSelect';
import Example from './CalculatorsSelect'
import BMIScreen from "./BMIScreen";
import ORMScreen from "./ORMScreen";


function  CalculatorsScreen()
{
    
    
    const [calc, setCalc] = useState();

    return(
        <NativeBaseProvider>
        <View  onPress={() => navigation.navigate('Home')} style={{ flex: 1}}>
           <CalculatorsSelect
           changeCalc= {calc=> setCalc(calc)}
           />
           {calc === "BMI" && <BMIScreen/>}
           {calc === "ORM" && <ORMScreen/>}
           
        </View>
        </NativeBaseProvider>
    )
    
}


export default CalculatorsScreen