import * as React from 'react'
import {View, Text} from 'react-native'


export default function GraphPlaceholder({recordsLength,selected})
{
    console.log(recordsLength +'gunwo')
    if(selected === undefined)
    {
    return(
        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center',textAlignVertical: 'center', fontSize: 24, fontWeight: '600', color: 'grey'}}>To see progress graph select exercise</Text>
        </View>
    )
    }
    else if(selected !== undefined && recordsLength == 0)
    {
        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center',textAlignVertical: 'center', fontSize: 24, fontWeight: '600', color: 'grey'}}>0 records recorded</Text>
    </View>
    }

}