import * as React from 'react'
import { View,Text, FlatList, ScrollView, Pressable,StyleSheet, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function WorkoutList({workouts,callback,setWorkout})
{
    
   

    const renderItem = ({item}) =>
    {
        return (
            <Item item = {item}/>
        )
    }

    const Item = ({item}) =>{
        return(
            <View style={styles.item}>
                
                <View style={{flex: 3}}>
                    <TouchableOpacity
                    onPress={()=>{
                        setWorkout(item)
                    }}>
                <Text style={styles.name}>{item.name}</Text>         
                </TouchableOpacity>
                </View>
                <View style={{flex: 1}}> 
                <TouchableHighlight
                style={{alignSelf: 'flex-end',  width: 30,height: 30}}
                onPress={() =>{
               callback(item)
                }}>
                    <Ionicons name='information-circle-outline'  size={32}/>
                    </TouchableHighlight>
                    </View> 
                              
            </View>
        )

    }

    return(
        <View style={{flex: 1}}>
        <FlatList
            data ={workouts}
            renderItem ={renderItem}
            keyExtractor={item =>item.id} 
            />
            </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 26,
      },
      item: {
         backgroundColor: '#5176FD',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 12,
        flexDirection: 'row'
      },
})