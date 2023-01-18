import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'


export default function DescriptionModal({description,visible,modalSet})
{
    

    if(description != null)
    {
        
    
    return(
        <Modal
        visible={visible}
        transparent={true}
        onRequestClose={()=>{modalSet(false)}}
        >
            <TouchableOpacity
            style={styles.outer}
            activeOpacity={1}
            onPressOut={()=>{modalSet(false)}}
            >
            <TouchableWithoutFeedback>
                <View style={styles.inner}>
                <Text>{description}</Text>
                </View>
            </TouchableWithoutFeedback>

            </TouchableOpacity>

        </Modal>
    )
    }
    else{
        return (<View>

        </View>)
    }


}

const styles = StyleSheet.create(
{
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
      }
}
)