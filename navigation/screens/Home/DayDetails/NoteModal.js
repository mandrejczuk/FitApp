import * as React from 'react'
import { View,StyleSheet,Modal,TouchableOpacity,TouchableWithoutFeedback, Text, TextInput, Button } from 'react-native'

export default function NoteModal({noteModalVisible,callback,selectedDay,noteData,setNoteData})
{

    return(

<Modal
      visible={noteModalVisible}
      transparent={true}
      onRequestClose={()=>{callback()}}
      >
          <TouchableOpacity
          style={styles.outer}
          activeOpacity={1}
          onPressOut={()=>{callback()}}
          >
            <TouchableWithoutFeedback>
          <View style={styles.inner}>
            <View style={{borderBottomWidth: 1,borderColor: 'grey'}}>
                <Text style={{textAlign: 'center', fontSize: 22,fontWeight: '500'}}>{selectedDay}</Text>
            </View>  
            
           <TextInput value={noteData}  defaultValue={noteData} style={{textAlignVertical: 'top',paddingHorizontal: 6, paddingVertical: 10}} numberOfLines={10}  multiline={true}  onChangeText={setNoteData} placeholder='Enter Note'  placeholderTextColor='grey'/>
        
          </View>
          
          </TouchableWithoutFeedback>
          </TouchableOpacity>
      </Modal>
    
    )
}
const styles = StyleSheet.create({
    outer: {
        backgroundColor:'#000000aa',
        alignItems: "center",
         justifyContent: "center",
        flex: 1
      },
      inner:{
        backgroundColor: '#FFFFCC',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 12,
        width: '80%'
      },
});