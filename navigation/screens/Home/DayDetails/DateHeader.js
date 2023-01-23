import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native";


export default function DateHeader({selectedDay,navigation})
{
    return(
        <View style={styles.header}>
        <Text style={styles.hdtext}>Workout plan on {selectedDay} </Text>
        <View style={styles.wrapRowTop}>
        <Text style={styles.hdtext}>click </Text>
        <Text style={styles.here} onPress={()=>navigation.navigate('HomeScreen')}>here </Text>
        <Text style={styles.hdtext}>to go back</Text>
        </View>
       
          </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapRowTop: {
      flexDirection:"row",
      flexWrap: "wrap",
      alignItems: 'center',
    },
    here:
    {
      fontSize: 26,
      fontWeight: '500',
      fontStyle:'italic',
      fontFamily: 'Verdana',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      color: '#CAC000',
      textAlign: 'center' 
    },
    hdtext:
    {
      color: '#1e1e1e',
      fontSize: 26,
    },
    backgroundText:{
      backgroundColor: '#1A2864',
      borderRadius: 12,
      textAlign: 'center'
    },
    data:{
      flex: 1
    },
    tabled:{
      flex: 2
    },
    header:{
      flex: 1,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 6
    },
    box: {
      backgroundColor: '#ffffff',
      margin: 10,
     // borderRadius: 50,
      borderWidth: 2,
      justifyContent: 'center',
      shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 6,
  },
  shadowOpacity: 0.39,
  shadowRadius: 8.30,
  
  elevation: 13,
    },
    wrapRow: {
      flexDirection:"row",
      flexWrap: "wrap",
      alignItems: 'center',
    },
    name: {
      fontSize: 26,
    },
    row:{
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 2,
      paddingVertical: 10,
      textAlign: 'center',
    },
    icon:{
      flex: 1,
      paddingHorizontal: 2,
      paddingVertical: 10,
      textAlign: 'center'
    },
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
    item: {
      backgroundColor: '#5176FD',
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 12,
      borderRadius: 12
    },
    flatcontainer: {
      flexGrow: 1
    }
  });
  