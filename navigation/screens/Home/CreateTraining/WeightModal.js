import React from 'react'
import { View,Button,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'

export default function WeightModal({visible,modalSet,exercisesDone,setExercisesDone,addWorkout})
{
  // console.log(JSON.stringify(exercisesDone))
    // const zrubto = ({text,item})=>
    // {
    //     var temp = exercisesDone

    //   //  temp[item.id].weight = text;
    //     console.log(item)
    //    // setExercisesDone(temp)
    // }
    
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
            console.log(text)
            var temp = exercisesDone

                temp[item.id].weight = parseFloat(text);

                console.log(temp[item.id].weight)
              
                setExercisesDone(temp)
        }

        const [text,onChangeText] = React.useState('')
       
        return(
        <View style={styles.item}>
        <View style={{flex: 2,justifyContent:'center'}}>
        <Text>{item.name}</Text>
        </View>
        <View style={{flex: 1, justifyContent:'center'}}>
            <TextInput value={text} onChangeText={(text)=>{onChangeText(text); updateWeight(text)}} placeholder='Enter Weight' keyboardType='numeric'></TextInput>
        </View>
        </View>
        )
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
                <Button title='Add Workout' onPress={()=>{modalSet(false); addWorkout()}}/>
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
            alignItems: "center",
             justifyContent: "center",
            flex: 1
          },
          inner:{
            backgroundColor: '#ffffff',
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 12
            // margin: 50,
            // padding: 40
          },
          item: {
            backgroundColor: '#5176FD',
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 12,
            flexDirection: 'row'
          },

    }
    )