import * as React from 'react'
import {View, Text, NativeBaseProvider,Input} from 'native-base'
import ProfileValues from './ProfileValues'

export default function ProfileScreen () {
    
    

    
    return(
        <NativeBaseProvider>
        <View style={{ flex: 1}} >
            <ProfileValues/>
        </View>
        </NativeBaseProvider>
    )
    
}