import * as React from 'react'
import { NativeBaseProvider,  Box,TextArea,Input,View,Text,Heading,Flex, Center, Spacer,HStack } from "native-base";
import BMISlider from './BMISlider';

export default function BMIScreen()
{
   const [weight, setWeight] = React.useState()
  const [height, setHeight] = React.useState()
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
   if(weight > 0 && height > 0)
   {
      setResult(Math.round(Number(newText)/(Number(height)*Number(height)/10000)*100)/100)
   }
}
const onChangedHeight = (text) => {
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
   setHeight(newText);
   if(weight > 0 && height > 0)
   {
      setResult(Math.round(Number(weight)/(Number(newText)*Number(newText)/10000)*100)/100)
   }
}



   return(
      <NativeBaseProvider>
      <HStack space="20%" justifyContent="center" mt='4'>
      <Text fontSize="2xl" >Height (cm)</Text>
        <Input  w={{
        base: "45%",
        md: "25%"}} rounded='xl' bg='#FFFFFF' size="xl" placeholder="Enter Height" keyboardType="numeric"
        onChangeText={text => onChangedHeight(text)}
        value = {height}  />
        </HStack>
        <HStack space="23%" justifyContent="center" mt='4'>
      <Text fontSize="2xl" >Weight(kg)</Text>
        <Input  w={{
        base: "45%",
        md: "25%"}} rounded='xl' bg='#FFFFFF' size="xl" placeholder="Enter Weight" keyboardType="numeric"
        onChangeText={text => onChangedWeight(text)} 
        value = {weight}
         />
        </HStack>
       
        <Center rounded='xl' shadow='9' bg='#FFFFFF' px='9' py='3' alignSelf='center' mt='4' _text={{
    fontSize: '2xl',
    fontWeight: 'medium',
    color: 'black',
    textAlign: 'center'}}>
          {result}
        </Center>
        <BMISlider result ={result}/>
      </NativeBaseProvider>
   )
}