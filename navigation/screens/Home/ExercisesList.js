import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native";
import * as React from 'react'

export function ExercisesList({data,callback}){


  const [selectedExerciseName,setSelectedExerciseName] = React.useState('Select Exercise From List')
  console.log(JSON.stringify(data))
  if(Array.isArray(data))
  {
    console.log('tak')
    console.log(data[0])
    console.log(data.length)
  }
  else{
    console.log('nie')
  }
    const renderAddItem = ({ item }) => {   

      return(

        <AddItem item={item} />
      );
    }
    
      const AddItem = ({ item }) => {
       // console.log(item)
        return(
        <View style={styles.item}>   
        <Pressable
        onPress={()=>{
          setSelectedExerciseName(item.name)
          callback(item)
        }}>
          <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        </View>
      )};


    return(
      <View style={{height: 200}}>  
        <FlatList
              data={data}
              renderItem={renderAddItem}
              keyExtractor={item =>item.id}
              />
              <View>
              <TextInput placeholder="Select Exercise From List" value={selectedExerciseName} editable = {false} />
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
      borderRadius: 50,
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
  