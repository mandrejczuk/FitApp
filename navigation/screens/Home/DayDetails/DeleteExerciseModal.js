import * as React from 'react'
import {Modal,TouchableOpacity,TouchableWithoutFeedback,View,Text,ScrollView,Pressable,Button,StyleSheet} from 'react-native'

export default function DeleteExerciseModal({deleteModalVisible,setDeleteModalVisible,selectedDeleteValue,setSelectedDeleteValue,onConfirmDelete,data})
{

    return(<Modal
        visible={deleteModalVisible}
        transparent={true}
        onRequestClose={()=>{setDeleteModalVisible(false)}}
        >
            <TouchableOpacity
            style={styles.outer}
            activeOpacity={1}
            onPressOut={()=>{setDeleteModalVisible(false)}}
            >
              <TouchableWithoutFeedback>
            <View style={styles.inner}>
              <Text style={{fontSize: 22,textAlign: 'center', fontWeight:'600',color: 'grey'}}>Click on exercise to delete</Text>
               <View style={{height: 150}}> 
            <ScrollView contentContainerStyle={{justifyContent:'center'}} style={{marginTop: 10, borderRadius: 10, padding: 6}}>
            {data.map((item,index)=>{
              return(
                <View style={styles.item} key={index}>
               <Pressable onPress={()=>setSelectedDeleteValue(item)}>
                <View>
                  <Text style={{fontSize:18, textAlign:'center',fontWeight:'500'}}>{item.name} </Text>
                </View>
              </Pressable>
                </View>
              )
            })}
            </ScrollView>
            </View>
           
            
            <Text style={{fontSize: 20,textAlign: 'center', color: 'grey'}}> {selectedDeleteValue !== undefined ?selectedDeleteValue.name: 'Click on list above' }</Text>
            <Button color='red' title="Confirm Delete" onPress={() => {onConfirmDelete()}}/>
            </View>
            </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>)
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#B22222',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 12
    },
    inner:{
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 12,
    },
    outer:{
        backgroundColor:'#000000aa',
        alignItems: "center",
         justifyContent: "center",
        flex: 1
    }
})