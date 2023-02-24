import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native";
import { db } from "../../../../database/DatabaseOpen.js";
import { getExerciesByNameCategoryEquipment } from "../../../../database/Requests/GetAllExercises.js";
import { Picker } from "@react-native-picker/picker";
import { ExercisesList } from "./ExercisesList.js";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addCustomExerciseToPlan } from "../../../../database/Requests/AddExerciseDone.js";
import { formatDate } from "../../../../components/FormatDate.js";

export default function AddExerciseModal({addModalVisible,setAddModalVisible,selectedDay,getData}) 
{
    const [text, onChangeText] = React.useState("");
    const [categoryValue, setCategoryValue] = React.useState('(8,9,10,11,12,13,14,15)');
    const [equipmentValue, setEquipmentValue] = React.useState('("",1,2,3,4,5,6,7,8,9,10,11)');
    const [exercisesList,setExercisesList] = React.useState(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))
    const [selectedExercise, setSelectedExercise] = React.useState()
    const [sets,onChangeSets] = React.useState("")
    const [reps, onChangeReps] = React.useState("")
    const [weight,onChangeWeight]= React.useState("")


   

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

    function onConfirmAdd()
    {
     var newItem = {
        id: selectedExercise.id,
        name: selectedExercise.name,
        weight: weight,
        sets: sets,
        repetitions: reps,
        done: 0
      }
      //data.push(newItem)
      addCustomExerciseToPlan(sets,reps,selectedExercise.id,weight,formatDate(selectedDay))
      getData()
      setAddModalVisible(false)
    }
   
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
            <View  style={{  flexDirection: 'row', padding: 10, width: '55%', backgroundColor: '#d9dbda', borderRadius: 10,alignSelf: 'center', alignItems: 'center'}}>
            <Ionicons  name='search-outline' size={20} color='#black' style={{marginLeft: 1, marginRight: 4}} />
            <TextInput placeholder='Search Exercise' style={{fontSize: 20,marginRight:20}} onChangeText={onChangeText}   value={text} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', padding: 16}}>
            <View style={{flex:1,justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Category</Text>
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
    <View style={{flex:1, justifyContent: 'center'}}>
      <Text style={{fontSize: 16,fontWeight: 'bold', textAlign: 'center'}}>Available Equipment</Text>
      <Picker
      selectedValue={equipmentValue}
      onValueChange={(itemValue, itemIndex) => setEquipmentValue(itemValue)}
      style={styles.pickerequipment}
      >
      <Picker.Item  label="All" value="('',1,2,3,4,5,6,7,8,9,10,11)" />
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
         
            <ExercisesList
            data={exercisesList}
            callback={setSelectedExercise}
            />
     
          <View>
            <View style={{flexDirection:'row', justifyContent:'space-evenly',padding: 12 }}>
              <TextInput style={{width: '30%', textAlign: 'center',backgroundColor: '#d9dbda',borderRadius: 10}} value={sets} onChangeText={onChangeSets} placeholder="Sets" keyboardType ='number-pad'/>
              <TextInput style={{width: '30%', textAlign: 'center',backgroundColor: '#d9dbda',borderRadius: 10}} value={reps} onChangeText={onChangeReps} placeholder="Reps" keyboardType ='number-pad'/>
              <TextInput style={{width: '30%', textAlign: 'center',backgroundColor: '#d9dbda',borderRadius: 10}} value={weight} onChangeText={onChangeWeight} placeholder="Weight" keyboardType = 'number-pad'/>
             </View>
             <Button  color='#32CD32' title ='Add Exercise' onPress={()=>{onConfirmAdd()}}/>
          </View>
          </View>
          </TouchableWithoutFeedback>
          </TouchableOpacity>
      </Modal>
  )
          }


          const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickercategory:{
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginTop: 20,
    
  },
  pickerequipment:{
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    borderWidth: 3,
    borderColor: 'black',
    marginTop: 20,
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
    minWidth: '90%',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 12,

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