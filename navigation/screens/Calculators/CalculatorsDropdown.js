import * as React from "react";
import { useState } from "react";
import { View, Text, SafeAreaView,StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Select } from "native-base";
import BMIScreen from "./BMIScreen";
import ORMScreen from "./ORMScreen";

export default function Dropdown() {
  
  const [selectedCalculator, setSelectedCalculator] = useState();
  const [bmiContentVisivle,setBMIContentVisible] = useState(false);
  const [ormContentVisivle,setORMContentVisible] = useState(false)

  // useEffect(() => {
  //   selectedCalculator === "BMI"
  //     ? setBMIContentVisible(true)
  //     : setBMIContentVisible(false);
  //   selectedCalculator === "ORM" ? setORMContentVisible(true) : setORMContentVisible(false);
  // }, [selectedCalculator]);
  function check(itemValue)
  {
    itemValue === "BMI"
      ? setBMIContentVisible(true)
      : setBMIContentVisible(false);
      itemValue === "ORM" ? setORMContentVisible(true) : setORMContentVisible(false);
  }
  return (
    <View
    style = { styles.container}>
    <Picker
      selectedValue={selectedCalculator}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedCalculator(itemValue) 
        check(itemValue)
      }
      }
      style = {styles.Dropdown}
    >
      <Picker.Item label="Choose Calcualtor" value="disabled" color="#aaa"  />
      <Picker.Item label="BMI" value="BMI" />
      <Picker.Item label="One Rep Max" value="ORM" />
      
    </Picker>
    <View style = {styles.Container}>
    {bmiContentVisivle && <BMIScreen/>}
    {ormContentVisivle && <ORMScreen/>}
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  Dropdown: {
    flex: 1,
  backgroundColor: "#cccc"
  
  },
  Container: {
   
  }
});


