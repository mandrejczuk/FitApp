import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { deleteExerciseDoneById } from "../../../database/Delete/DeleteExerciseDoneById.js";
export default function DayDetailsScreen({ route, navigation }) {

    const {selectedDay} = route.params
    
    const {data} = route.params
    console.log(selectedDay)
 //   console.log(data.length)
    const [deleteModalVisible,setDeleteModalVisible] = React.useState(false)
    const [addModalVisible,setAddModalVisible] = React.useState(false)
    const [selectedDeleteValue,setSelectedDeleteValue] = React.useState(start())

    function start()
    {
      if(data.length > 0)
      {
        return data[0].id
      }
      else return 
    }

    const onConfirmDelete = () =>{
      const result = data.filter(exercise =>exercise.id == selectedDeleteValue)
      const index = data.indexOf(result[0])
      console.log(index)
      data.splice(index,1)

//       const numbers = [1, 2, 3];
// const index = numbers.indexOf(3);
// if (index > -1) {
//   numbers.splice(index, 1);
// }
// console.log(numbers); 
      deleteExerciseDoneById(result[0].id);
       setDeleteModalVisible(false);
       console.log(data)
   }


    const AddExerciseModal = () => (
        <Modal
        visible={addModalVisible}
        transparent={true}
        onRequestClose={()=>{setAddModalVisible(false)}}
        >
            <TouchableOpacity
            style={styles.outer}
            activeOpacity={1}
            onPressOut={()=>{setAddModalVisible(false)}}
            >
              <TouchableWithoutFeedback>
            <View style={styles.inner}>
            <Text>xddddd</Text>
            </View>
            </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )

    const renderDeleteExerciseList = () => {
      return data.map((exercise)=>{
        return <Picker.Item key={exercise.id} label = {exercise.name} value = {exercise.id}/>
      })
    }

    const DeleteExerciseModal = () => (
      <Modal
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
          <Picker
          style= {{margin: 10, width: 150, height: 35}}
          selectedValue = {selectedDeleteValue}
          onValueChange = {(itemValue,itemIndex) =>
          {
            setSelectedDeleteValue(itemValue);
          }}
          >
            {renderDeleteExerciseList()}
          </Picker>
          <Button title="Confirm Delete" onPress={() => {onConfirmDelete()}}/>
          </View>
          </TouchableWithoutFeedback>
          </TouchableOpacity>
      </Modal>
  )
    

    const DateHeader = () =>(
      <View style={styles.header}>
    <Text style={styles.hdtext}>Workout plan on {selectedDay} </Text>
    <View style={styles.wrapRowTop}>
    <Text style={styles.hdtext}>click </Text>
    <Text style={styles.here} onPress={()=>navigation.navigate('HomeScreen')}>here </Text>
    <Text style={styles.hdtext}>to go back</Text>
    </View>
   
      </View>
    )

    const Buttons = () =>(
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
        <Button style={{flex: 1, borderRadius: 12}} title="Delete Exercise" color='red' onPress={()=>{setDeleteModalVisible(true)}}/>
        <Button style={{flex: 1, borderRadius: 12}} title="Add Exercise" color='lightgreen' onPress={()=>{setAddModalVisible(true)}}/>
        <AddExerciseModal/>
        <DeleteExerciseModal/>
      </View>
    )

    const renderItem = ({ item }) => (
      <Item item={item} />
    );

    const header = () =>(
      <View style={styles.wrapRow}>
        <Text style={styles.row}>Name </Text>
        <Text  style={styles.row}>Weight [kg] </Text>
        <Text  style={styles.row}>Sets </Text>
        <Text  style={styles.row}>Reps </Text>
        <Text  style={styles.row}>Done </Text>
      </View>
    )

    const Item = ({ item }) => (
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
          <Ionicons style={styles.icon} name="checkmark-outline" size="24px" color="green" />
        ) 
        : 
        (
          <Ionicons style={styles.icon} name="close-outline" size="24px" color="red" />
        )}
      </View>
    );

  return (
    <SafeAreaView style = {styles.container}>
    <View style={styles.data}>
      <DateHeader/>
    </View>
    <View style= {styles.tabled}>
    <View style={styles.box}>
                    <FlatList
                    data ={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={header}
                    />
                </View>
                </View>
                <View style={styles.container}>
                <Buttons/>
                </View>
    </SafeAreaView>
  );
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
    borderRadius: '50',
    borderWidth: '2px',
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
});
