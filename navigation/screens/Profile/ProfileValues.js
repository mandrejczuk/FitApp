import * as React from 'react'
import {View, Text, NativeBaseProvider,Box,Input,Stack,Avatar,Container} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileValues()
{
    const [inputDisabled,setInputDisabled] = React.useState(true)
    const [height,setHeight] = React.useState()
    const [weight,setWeight] = React.useState()
    const [bodyFat,setBodyFat] = React.useState()


   const _storeHeight = async () => {
        try {
          await AsyncStorage.setItem(
            'height',
            height
          );
        } catch (error) {
          // Error saving data
          alert("nieudalosie zapisac wzrostu")
        }
      };

   const   _storeBodyFat = async () => {
        try {
          await AsyncStorage.setItem(
            'bodyfat',
            bodyFat
          );
        } catch (error) {
          // Error saving data
          alert("nieudalosie zapisac wzrostu")
        }
      };

    const  _storeWeight = async () => {
        try {
          await AsyncStorage.setItem(
            'weight',
            weight
          );
        } catch (error) {
          // Error saving data
          alert("nieudalosie zapisac wwagi")
        }
      };

    const  _retrieveHeight = async () => {
        try {
          setHeight( await AsyncStorage.getItem('height'));
          if (height !== null) {
            // We have data!!
            console.log(height);
          }
        } catch (error) {
          alert("wzrost = null")
        }
      };

    const  _retrieveWeight = async () => {
        try {
          setWeight( await AsyncStorage.getItem('weight'));
          if (height !== null) {
            // We have data!!
            console.log(weight);
          }
        } catch (error) {
          alert("waga = null")
        }
      };

    const  _retrieveBodyFat = async () => {
        try {
          setBodyFat( await AsyncStorage.getItem('bodyfat'));
          if (height !== null) {
            // We have data!!
            console.log(bodyFat);
          }
        } catch (error) {
          alert("bf = null")
        }
      };



    const onChangedWeight = (text) => {
        let newText = '';
        let numbers = '0123456789.';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                if(newText.length<5)
                {
                    newText = newText + text[i];
                }
            }
            else {
                alert("please enter numbers only");
            }
        }
        setWeight(newText);
    }

    const onChangedHeight = (text) => {
        let newText = '';
        let numbers = '0123456789.';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                if(newText.length<5)
                {
                    newText = newText + text[i];
                }
                
            }
            else {
                alert("please enter numbers only");
            }
        }
        setHeight(newText);
    }
    const onChangedBodyFat = (text) => {
        let newText = '';
        let numbers = '0123456789.';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                if(newText.length<4)
                {
                    newText = newText + text[i];
                }
            }
            else {
                alert("please enter numbers only");
            }
        }
        setBodyFat(newText);
    }

    const setBodyValues = () =>{
        if(inputDisabled)
        {
            _retrieveBodyFat()
             _retrieveHeight()
            _retrieveWeight()
        }
        else{
            _storeBodyFat()
            _storeHeight()
            _storeWeight()
        }
    }


    return(
        <NativeBaseProvider>
            <View style={{ flex: 1}}>
                <View style={{ flex: 3 ,flexDirection: 'row'}}>
                <Box style={{ flex: 1}} alignSelf='stretch' bg='#FFFFFF' mt='6'  ml='4' shadow='6' borderRadius='8' maxW='350px'>

                    <Box style={{ flex: 1}} alignItems='flex-end' p='1'>
                    <Ionicons name='create' color='grey' size={25} onPress={()=>{setInputDisabled(!inputDisabled)
                    setBodyValues()}} />
                    </Box>

                    <Container style={{ flex: 6}}  alignSelf='center' justifyContent='space-around' mb='3'>
                        <Stack space={4}    maxW="300px"  justifyContent='space-around' alignItems='center'  >
                            <Input maxH='35px'   variant='outline' placeholder='Height' isDisabled={inputDisabled} value={height}  shadow='6' onChangeText={text => onChangedHeight(text)}   />
                            <Input maxH='35px' variant='outline' placeholder='Weight' isDisabled={inputDisabled} shadow='6' value={weight} onChangeText={text => onChangedWeight(text)} />
                             <Input maxH='35px' variant='outline' placeholder='Body Fat' isDisabled={inputDisabled} shadow='6' value={bodyFat} onChangeText={text => onChangedBodyFat(text)} />
                            </Stack>
                    </Container>
                </Box>
                <Box style={{ flex: 1, alignItems: 'flex-end'}} mr='4'>              
      <Avatar bg="indigo.500" source={{
      uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }} size="xl">
        
      </Avatar>
                </Box>
                </View>

                <View style={{ flex: 7}} >
                
                </View>
            </View>
        </NativeBaseProvider>
    )
}