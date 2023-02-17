import * as React from 'react'
import {View,Text, TextInput} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function SearchBar({text,onChangeText,setListVisble})
{

    
    return(
    <View>
        <View style={{  flexDirection: 'row', padding: 10, width: '95%', backgroundColor: '#d9dbda', borderRadius: 10, alignItems: 'center'}}>
        <Ionicons  name='search-outline' size={20} color='#black' style={{marginLeft: 1, marginRight: 4}} />
        <TextInput placeholder='Search Exercise' style={{fontSize: 20}} value={text} onChangeText={(newText) =>{onChangeText(newText)}} onFocus={()=>setListVisble(true)}   />
        </View>
    </View>
    )
}