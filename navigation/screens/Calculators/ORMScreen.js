import { StyleSheet} from "react-native";
import * as React from "react";
// import { TextInput } from "react-native-web";
import { NativeBaseProvider,  Box,TextArea,Input,View,Text,Heading,Flex, Center, Spacer,HStack } from "native-base";


export default function ORMScreen() {

  

  const [weight, setWeight] = React.useState()
  const [repetitions, setRepetitions] = React.useState()
  const [result,setResult] = React.useState('Result')

  const onChangedWeight = (text) => {
    let newText = '';
    let numbers = '0123456789.';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("please enter numbers only");
        }
    }
    setWeight(newText);
    if(repetitions>1)
    {
      setResult(Math.round(Number(newText)*Number((1+(Number(repetitions)/30)))*100)/100)
    }
    else if(repetitions == 1)
    {
      setResult(Math.round(Number(newText)*100)/100)
    }
    else
    {
      setResult("Result")
    }

}
const onChangedRepetitions = (text) => {
  let newText = '';
  let numbers = '0123456789';

  for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
          newText = newText + text[i];
      }
      else {
          alert("please enter numbers only");
      }
  }
  setRepetitions(newText);
  

  if(Number(newText)>1)
  {
    setResult(Math.round(Number(weight)*Number((1+(Number(newText)/30)))*100)/100)
  }
  else if(Number(newText) == 1)
  {
    setResult(Math.round(Number(weight)*100)/100)
  }
  else{
    setResult("Result")
  }

}

  return (
    // <View style={styles.row}>
    //   <View style={styles.inputWrap}>
    //     <Text style={styles.liftText}>Lift (kg)</Text>
    //     <TextInput 
    //     style = {styles.liftInput}
    //     placeholder = "Enter Weight"
    //     maxLength={5}
    //     value = {weight}
    //     onChangeText={text => onChanged(text)}
    //     keyboardType = "numeric"
    //     />
    //   </View>
    //   <View style = {styles.SecondRow}>

    //   </View>
      
    // </View>
    <NativeBaseProvider>
    <HStack space="30%" justifyContent="center">
    <Text fontSize="2xl" >Lift (kg)</Text>
      <Input  w={{
      base: "45%",
      md: "25%"}} size="xl" placeholder="Enter Weight" keyboardType="numeric"
      onChangeText={text => onChangedWeight(text)}
      value = {weight}  />
      </HStack>
      <HStack space="20%" justifyContent="center">
    <Text fontSize="2xl" >Repetitions</Text>
      <Input  w={{
      base: "45%",
      md: "25%"}} size="xl" placeholder="Count" keyboardType="numeric"
      onChangeText={text => onChangedRepetitions(text)} 
      value = {repetitions}
       />
      </HStack>
     
        <Box alignSelf="center"  p="12" rounded="xl" 
        shadow="9"
        _text={{
    fontSize: '2xl',
    fontWeight: 'medium',
    color: 'black',
    textAlign: 'center'}}
    >
      {result}
        </Box>
    </NativeBaseProvider>
    
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    borderColor: "#cccccc",
    borderTopWidth: 1,
    marginBottom: 10,
    flexDirection: "row",
  
  },
  row: {
    flexDirection: "column",
  },
  liftText: {
    fontSize: 20,
    backgroundColor: "purple"
  },

  liftInput:{
   backgroundColor: "green",
   borderColor: "red",
   borderWidth: 1
  },
  SecondRow:{
    flex: 1,
    backgroundColor: "black",
    height: 130
  },
  
});
