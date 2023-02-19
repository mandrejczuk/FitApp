import * as React from 'react'
import {View,Text,StyleSheet, FlatList, Button, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function  WorkoutBox({data}){

 

  
   
    const WorkoutBox = () =>
    {
        if(data.length >0)
        {
        return(
            <ScrollView contentContainerStyle={{justifyContent: 'center'}} style ={{backgroundColor: '#d9dbda', borderRadius: 10, padding: 6}}>
                {
                    data.map((item,index)=>
                    {
                        return(
                            <View style={{flex: 1}} key={index}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Text style={{fontSize: 18, flex: 3,textAlign:'center',fontWeight:'400'}} numberOfLines={1}>{item.name}</Text>
                                <Text style={{fontSize: 18, flex: 1,textAlign:'center',fontWeight:'400'}}  numberOfLines={1}>{item.weight}</Text>
                                {item.done > 0 
            ? 
            (
              <Ionicons style={{flex:1,textAlign:'center'}} name="checkmark-outline" size={32} color="green" />
            ) 
            : 
            (
              <Ionicons style={{flex:1,textAlign:'center'}} name="close-outline" size={32} color="red" />
            )}
                            </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
            }
            else{
                return(
                    <Text style={{textAlign: 'center',textAlignVertical: 'center', fontSize: 24, fontWeight: '600', color: 'grey'}}>No planned exercises for selected day</Text>
                )
            }
    }

    return(
        
      
            <View >  
                <WorkoutBox/>          
            </View>
         
    )
}

