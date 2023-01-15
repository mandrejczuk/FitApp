import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { deleteExerciseDoneById } from "../../../database/Delete/DeleteExerciseDoneById.js";
import { ExercisesList } from "./ExercisesList.js";
import { getExerciesByNameCategoryEquipment } from "../../../database/Requests/GetAllExercises.js";
import { db } from "../../../database/DatabaseOpen.js";

export default function DayDetailsScreen({ route, navigation }) {

    const {selectedDay} = route.params
    
    const {data} = route.params
    // const {exercises} = route.params
    console.log(selectedDay)
 //   console.log(data.length)
    const [deleteModalVisible,setDeleteModalVisible] = React.useState(false)
    const [addModalVisible,setAddModalVisible] = React.useState(false)
    const [selectedDeleteValue,setSelectedDeleteValue] = React.useState(start())
    const [selectedAddValue,setSelectedAddValue] = React.useState()
     const [selectedExerciseName,setSelectedExerciseName] = React.useState()
    //  const [text, onChangeText] = React.useState("");
    // const [categoryValue, setCategoryValue] = React.useState('(8,9,10,11,12,13,14,15)');
    // const [equipmentValue, setEquipmentValue] = React.useState('("",1,2,3,4,5,6,7,8,9,10,11)');
    // const [exercisesList,setExercisesList] = React.useState(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))
   
    // React.useEffect(()=>{

    //   setExercisesList(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))
    //  // console.log(JSON.stringify(exercisesList))


    //  getData()

        
    // },[categoryValue,equipmentValue,text])


   

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
   


   const renderAddItem = ({ item }) => (
    <AddItem item={item} />
  );

  const AddItem = ({ item }) => {
    return(
    <View style={styles.item}>   
    <Pressable
    onPress={()=>{setSelectedExerciseName(item.name)}}>
      <Text style={styles.name}>{item.name}</Text>
      </Pressable>
    </View>
  )};

 

    const AddExerciseModal = () => {
      const [text, onChangeText] = React.useState("");
      const [categoryValue, setCategoryValue] = React.useState('(8,9,10,11,12,13,14,15)');
      const [equipmentValue, setEquipmentValue] = React.useState('("",1,2,3,4,5,6,7,8,9,10,11)');
      const [exercisesList,setExercisesList] = React.useState(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))


     

      React.useEffect(()=>{

        // setExercisesList(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))
       // console.log(JSON.stringify(exercisesList))
  
       db.readTransaction(function(tx)
       {
          
         tx.executeSql('SELECT Distinct e.* FROM Exercises e '
         + 'LEFT JOIN ExercisesBase eb ON e.exerciseBase_id = eb.id ' 
         + 'LEFT JOIN Categories C  ON eb.category_id = c.id '
         + 'LEFT JOIN ExercisesBase_Equipments eeb ON eb.id = eeb.exerciseBase_id ' 
         + 'LEFT JOIN Equipments eq ON eeb.equipment_id = eq.id  '
         + 'WHERE '
         + 'equipment_id IN '+ equipmentValue
         + ' AND '
         + 'category_id IN ' + categoryValue
         + ' AND '
         + 'e.name LIKE ' + '"%' + text + '%"'  
         ,[],function(_,res)
           {
             var tempo = []
               for(let i = 0; i < res.rows.length ; i++)
               {
                  tempo.push(res.rows.item(i))
               }
               setExercisesList(tempo)
           })
       },
       function (error) {
         console.log("Transaction ERROR data delete: " + error.message);
       },
       function () {
         console.log("Populated database (data delete) OK");
       }
     );
          
      },[categoryValue,equipmentValue,text])
  
     
      return (
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
              <View style={{alignItems:'center'}}>
              <TextInput onChangeText={onChangeText}  placeholder="Search" value={text} />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={styles.category}>
        <Picker
        selectedValue={categoryValue}
        onValueChange={(itemValue, itemIndex) =>  setCategoryValue(itemValue)}
        style={styles.pickercategory}
        >
        <Picker.Item label="All" value="(8,9,10,11,12,13,14,15)" />
        <Picker.Item label="Arms" value="(8)" />
        <Picker.Item label="Legs" value="(9)" />
        <Picker.Item label="Abs" value="(10)" />
        <Picker.Item label="Chest" value="(11)" />
        <Picker.Item label="Back" value="(12)" />
        <Picker.Item label="Shoulders" value="(13)" />
        <Picker.Item label="Calves" value="(14)" />
        <Picker.Item label="Cardio" value="(15)" />
        </Picker>
        
      </View>
      <View style={styles.equipment}>
        <Picker
        selectedValue={equipmentValue}
        onValueChange={(itemValue, itemIndex) => setEquipmentValue(itemValue)}
        style={styles.pickerequipment}
        >
        <Picker.Item label="All" value="('',1,2,3,4,5,6,7,8,9,10,11)" />
        <Picker.Item label="Barbell" value="(1)" />
        <Picker.Item label="SZ-Bar" value="(2)" />
        <Picker.Item label="Dumbbell" value="(3)" />
        <Picker.Item label="Gym mat" value="(4)" />
        <Picker.Item label="Swiss Ball" value="(5)" />
        <Picker.Item label="Pull-up bar" value="(6)" />
        <Picker.Item label="none" value="(7)" />
        <Picker.Item label="Bench" value="(8)" />
        <Picker.Item label="Incline bench" value="(9)" />
        <Picker.Item label="Kettlebell" value="(10)" />
        <Picker.Item label="Resistance Band" value="(11)" />
        </Picker>
      </View>
              </View>
            <ScrollView>
            {/* <View style={{height: 200}}>   */}
              {/* <FlatList
              data={exercises}
              renderItem={renderAddItem}
              keyExtractor={item =>item.id}
              /> */}
              <ExercisesList
              data={exercisesList}
              />
            {/* </View> */}
            </ScrollView>
            <View>
              <View>
                <TextInput placeholder="Number of sets" keyboardType ='number-pad'/>
                <Text> Reps</Text>
               </View>
               <Button title ='Add Exercise' onPress={()=>{}}/>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
            }

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
