import React from "react";
import { View,Text,Pressable,FlatList,StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function WorkoutExercisesList({data,callbackDone,extraData})
{
   
    
    const header = () =>(
        <View style={styles.wrapRow}>
          <Text style={styles.row}>Name </Text>
          <Text  style={styles.row}>Weight</Text>
          <Text  style={styles.row}>Sets </Text>
          <Text  style={styles.row}>Reps </Text>
          <Text  style={styles.row}>Done </Text>
        </View>
      )

    const renderItem = ({ item }) => (
        <Item item={item} />
      );


      const Item = ({ item }) => {
        
        const callback= () =>
        {
            callbackDone(item)
        }
        return(
        <View style={styles.wrapRow}>
          <Text style={styles.row}>
            {item.name}{" "}
          </Text>
          <Text style={styles.row}>{item.weight} </Text>
          <Text style={styles.row}>{item.sets} </Text>
          <Text style={styles.row}>{item.repetitions} </Text>
          {item.done > 0 
          ? 
          (
            <Ionicons onPress={()=>callback()} style={styles.icon} name="checkmark-outline" size={24} color="green" />       
          ) 
          : 
          (
            <Ionicons onPress={()=>callback()} style={styles.icon} name="close-outline" size={24} color="red" /> 
          )}
        </View>
      )};

    return(
       <View style={{flex: 1}}>
        {data.length > 0 
        ?
        <View style={styles.box}>
         <FlatList
                    data ={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={header}
                    extraData={extraData}
                    /> 
                    </View> 
                    :
                    
                    <Text style={{flex:1,textAlign:'center', textAlignVertical: 'center', fontSize: 26,fontWeight:'700', color: 'grey'}}>No planned exercises for selected day</Text>
                
        }
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
      paddingVertical: 8,
      textAlign: 'center',
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
  