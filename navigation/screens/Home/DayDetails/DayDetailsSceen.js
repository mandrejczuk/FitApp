import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { deleteExerciseDoneById } from "../../../../database/Delete/DeleteExerciseDoneById.js";
import { ExercisesList } from "./ExercisesList.js";
import { getExerciesByNameCategoryEquipment } from "../../../../database/Requests/GetAllExercises.js";
import { db } from "../../../../database/DatabaseOpen.js";
import { addCustomExerciseToPlan } from "../../../../database/Requests/AddExerciseDone.js";
import { formatDate } from "../../../../components/FormatDate.js";
import DateHeader from "./DateHeader.js";
import WorkoutExercisesList from "./WorkoutExercisesList.js";
import { updateDoneExerciseDone } from "../../../../database/Requests/UpdateDoneExerciseDone.js";
import { isThisANewRecord } from "../../../../database/Requests/IsThisANewRecord.js";
import { addRecord } from "../../../../database/Requests/AddRecord.js";
import { deleteRecordByExerciseDone } from "../../../../database/Requests/deleteRecordByExerciseDone.js";
import AddExerciseModal from "./AddExerciseModal.js";

export default function DayDetailsScreen({ route, navigation }) {

    const {selectedDay} = route.params
    
   const {data} = route.params
    // const {exercises} = route.params
    console.log(selectedDay)
    console.log(data)
 //   console.log(data.length)
    const [deleteModalVisible,setDeleteModalVisible] = React.useState(false)
    const [addModalVisible,setAddModalVisible] = React.useState(false)
    const [selectedDeleteValue,setSelectedDeleteValue] = React.useState(start())
    const [selectedAddValue,setSelectedAddValue] = React.useState()
     const [selectedExerciseName,setSelectedExerciseName] = React.useState()
     const [refresh,setRefresh] = React.useState(false)
     const [isRecord,setIsRecord] = React.useState('setted')
    //  const [text, onChangeText] = React.useState("");
    // const [categoryValue, setCategoryValue] = React.useState('(8,9,10,11,12,13,14,15)');
    // const [equipmentValue, setEquipmentValue] = React.useState('("",1,2,3,4,5,6,7,8,9,10,11)');
    // const [exercisesList,setExercisesList] = React.useState(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))
   
    // React.useEffect(()=>{

    //   setExercisesList(getExerciesByNameCategoryEquipment(text,categoryValue,equipmentValue))
    //  // console.log(JSON.stringify(exercisesList))


    //  getData()

        
    // },[categoryValue,equipmentValue,text])

    React.useEffect(()=>{
      setSelectedDeleteValue(start())
    },[])

    

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
    

   
    const Buttons = () =>(
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
        <Button style={{flex: 1, borderRadius: 12}} title="Delete Exercise" color='red' onPress={()=>{setDeleteModalVisible(true)}}/>
        <Button style={{flex: 1, borderRadius: 12}} title="Add Exercise" color='lightgreen' onPress={()=>{setAddModalVisible(true)}}/>
      </View>
    )

   const callbackDone = (item) =>
   {
    let index =data.indexOf(item)
    let temp = data[index]
    if(temp.done == 0)
    {
      temp.done = 1
    }
    else{
      temp.done = 0
    }
    console.log(temp)
   data.splice(index,1,temp) 
   setRefresh(!refresh)
  updateDoneExerciseDone(temp.id,temp.done)
  if(temp.done == 0)
  {
    //Check if this exerciseDone is a Record
      isExerciseARecord(temp.id)
    
      console.log(isRecord)
    if(isRecord)
    {
    
      //delete Record
      deleteRecordByExerciseDone(temp.id)
    }

    setIsRecord('settted')
  }
  else if(temp.done == 1)
  {
   
   //Estimating potential record 
    let estORM;
    if(temp.repetitions > 1)
    {
       estORM = temp.weight * (1 + (temp.repetitions/30))
    }
    else{
       estORM = temp.weight
    }
    //Check if this estimated value is a record
    isThisANewRecord(temp.exercise_id,estORM)
    console.log(isRecord)
    if(isRecord)
    {
      //Save record
      addRecord(temp.id,estORM)
    }

    setIsRecord('settted')
  }
   }


  function isThisANewRecord(id,weight)
  {
    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT count(*) as licz FROM Records r '
        +'LEFT JOIN ExercisesDone ed ON r.exerciseDone_id = ed.id '
        +'LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id '
        +'WHERE exercise_id = ? and ed.weight > ?',[id,weight],function(_,res)
        {
            console.log(res.rows.item(0).licz)
            if(res.rows.item(0).licz > 0)
            {
               setIsRecord(false);
            }
            else
            {
              setIsRecord(true);
             // addRecord(id2,weight)
            }
        })
    },
    function (error) {
      console.log("Transaction ERROR IS THIS A NEW RECORD : " + error.message);
    },
    function () {
      console.log("Populated database (IS THIS A NEW RECORD) OK");
    })

  }

  function isExerciseARecord(exerciseDone_id)
{


    

    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT COUNT(*) as licz FROM Records '
        +'WHERE exerciseDone_id = ? ',[exerciseDone_id],function(_,res)
        {
          console.log(res.rows.item(0).licz)
            if(res.rows.item(0).licz > 0)
            {
             setIsRecord(true)
            }
            else
            {
             setIsRecord(false)
            }
        })

    },
    function (error) {
      console.log("Transaction ERROR IS EXERCISE A RECORD : " + error.message);
    },
    function () {
      console.log("Populated database (IS EXERCISE A RECORD) OK");
    })

  
}

    
   

  return (
    <SafeAreaView style = {styles.container}>
    <View style={styles.data}>
      <DateHeader
      selectedDay={selectedDay}
      navigation={navigation}
      />
    </View>
    <View style= {styles.tabled}>
    <ScrollView>
    <View style={styles.box}>
                    <WorkoutExercisesList
                    data={data}
                    callbackDone={callbackDone}
                    extraData={refresh}
                    />
                </View>
                </ScrollView>
                </View>
                <View style={styles.container}>
                <Buttons/>
                </View>
                <AddExerciseModal
                addModalVisible={addModalVisible}
                setAddModalVisible={setAddModalVisible}
                />
        <DeleteExerciseModal/>
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
