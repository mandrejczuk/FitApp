import React from 'react'
import { View,Button,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'

export default function WeightModal({visible,modalSet,exercisesDone,setExercisesDone,addWorkout})
{

    const renderItem = ({item}) =>
    {
        return (
            <Item item ={item}/>
        )
    }

    const Item =({item}) =>
    { 

      
        const updateWeight = (text)=>
        {
        
            var temp = exercisesDone

                temp[item.id].weight = parseFloat(text);
             
              
                setExercisesDone(temp)
        }

        const [text,onChangeText] = React.useState('')
        const onChangedWeight = (text) =>{
            let newText = '';
            let numbers = '0123456789.';
          
            for (var i=0; i < text.length; i++) {
                if(numbers.indexOf(text[i]) > -1 ) {
                    newText = newText + text[i];
                }
                else {
                    alert("Please enter number only");
                }
            }
          onChangeText(newText)
          }
       
        return(
        <View style={styles.item}>
        <View style={{flex: 2,justifyContent:'center'}}>
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight:'500'}}>{item.name}</Text>
        </View>
        <View style={{flex: 1, justifyContent:'center'}}>
            <TextInput style={{backgroundColor:'#FFFFFF', textAlign: 'center',borderWidth: 1,borderColor: 'black'}} multiline={true} numberOfLines={1} value={text} onChangeText={(text)=>{onChangedWeight(text); updateWeight(text)}} placeholder={item.expectedValue.toString()} keyboardType='numeric'></TextInput>
        </View>
        </View>
        )
    }

    function Validation()
    {
        let temp = 0
        exercisesDone.map(exercise=>{
            if(exercise.weight == '')
            {
                temp++
            }
        })

        if(temp == 0)
        {
            modalSet(false)
            addWorkout()
        }
        else{
            alert('Weight cannot be empty')
        }

    }

    return(
        <Modal
        visible={visible}
        transparent={true}
        onRequestClose={()=>{modalSet(false)}}
        >
            <TouchableOpacity
            style={styles.outer}
            activeOpacity={1}
            onPressOut={()=>{modalSet(false)}}
            >
            <TouchableWithoutFeedback>
                <View style={styles.inner}>
                <FlatList
                data={exercisesDone}
                renderItem={renderItem}
                keyExtractor={item =>item.id}
                />
                <Button color='green' title='Add Workout' onPress={()=>{Validation()}}/>
                </View>
            </TouchableWithoutFeedback>

            </TouchableOpacity>

        </Modal>
    )
}

const styles = StyleSheet.create(
    {
        outer: {
            backgroundColor:'#000000aa',
             justifyContent: "center",
            flex: 1
          },
          inner:{
            backgroundColor: '#ffffff',
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 12,
            // margin: 50,
            // padding: 40
          },
          item: {
            backgroundColor: '#5176FD',
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 12,
            flexDirection: 'row',
            borderRadius: 8
          },

    }
    )