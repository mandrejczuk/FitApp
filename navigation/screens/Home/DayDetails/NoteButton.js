import * as React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'


export default function NoteButton({setNodeModalVisible}){

    return(
        <View style={{padding: 10, paddingBottom: 20}}>
            <Button onPress={()=>{setNodeModalVisible(true)}} title='Show Note' color='orange'/>
        </View>
    )
}
