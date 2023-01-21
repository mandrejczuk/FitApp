import React from 'react'
import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable, Button } from 'react-native'


export default function AddBar({callback,buttonDisabled,setWeightModal})
{
    
    return(
        <View style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
            <Button disabled={buttonDisabled} title='Set Weights' onPress={()=>{setWeightModal(true)}} />
        </View>
    )
}