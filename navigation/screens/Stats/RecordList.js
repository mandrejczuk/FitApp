import * as React from 'react'
import {View,Text, ScrollView} from 'react-native'



export default function RecordList({data})
{
    return(
    <ScrollView style={{flex:1}}>
        {data.length > 0 &&
        <View style={{flex: 1,flexDirection:'row'}}>
            <View style={{flex:1}}>
            <Text style={{fontSize: 22,fontWeight: 'bold',textAlign:'center'}}>Date</Text>
            </View>
            <View style={{flex:1}}>
            <Text style={{fontSize: 22,fontWeight: 'bold',textAlign:'center'}}>ORM Value</Text>
            </View>
        
        </View>
}
{
    data.length == 0 &&
    <View>
        <Text style={{fontSize: 24, color: 'grey', textAlign: 'center',textAlignVertical:'center'}}>No records recorded</Text>
    </View>
}
    {
        data.map((item,index) =>{
            return(
                <View key={index} style={{flex: 1,flexDirection:'row'}}>
                   <View style={{flex:1}}>
            <Text style={{textAlign:'center'}}>{item.x.slice(0,10)}</Text>
            </View>
            <View style={{flex:1}}>
            <Text style={{textAlign:'center'}}>{item.y}</Text>
            </View>
                </View>
            )
        })
    }
    </ScrollView>
    )
}