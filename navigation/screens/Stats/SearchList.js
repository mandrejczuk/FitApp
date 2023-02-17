import * as React from 'react'
import {View,Text,ScrollView, Pressable} from 'react-native'



export default function SearchList({data,setItem})
{
    return(
    <ScrollView style={{flex:1, marginTop: 10, backgroundColor: '#d9dbda', borderRadius: 10, padding: 6}}>
    {
        data.map((item,index) =>{
            return (
                <View key={index}>
                <Pressable  onPress={()=>setItem(item)}>
                <View>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                </View>
                </Pressable>
                </View>
            )
        })

    }
    </ScrollView>
    )
}