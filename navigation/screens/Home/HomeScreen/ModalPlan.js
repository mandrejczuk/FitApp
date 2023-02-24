import * as React from 'react'
import { Button, Modal, TouchableOpacity, TouchableWithoutFeedback, View,StyleSheet,Text } from 'react-native'

export default function ModalPlanning({modalVisible,setModalVisible,navigateDetails,navigatePlaningWorkout})
{
    return(
        <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={()=>{setModalVisible(false)}}
        >
        <TouchableOpacity
        style={styles.outer}
        activeOpacity={1}
        onPressOut={()=>{setModalVisible(false)}}
        >
            <TouchableWithoutFeedback>
                <View style={styles.inner}>
                    <Text style={{paddingHorizontal:16, paddingVertical:12 ,fontSize: 24, fontWeight:'600', color: '#585858', textAlign: 'center'}}>Would you like to use predefined workouts?</Text>
                    <View style={{ flexDirection:'row', justifyContent: 'space-evenly'}}>
                    <Button
                    color='green'
                     title='YES' onPress={()=>{
                        setModalVisible(false)
                        navigatePlaningWorkout()
                        }}/>

                    <Button 
                    color='red'
                    title='NO'
                    onPress={()=>{
                        setModalVisible(false)
                        navigateDetails()
                    }}
                    />
                    </View>
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
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 12
        // margin: 50,
        // padding: 40
      },
})