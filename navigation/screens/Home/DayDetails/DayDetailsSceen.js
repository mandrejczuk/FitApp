import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView,Button, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native";
import { deleteExerciseDoneById } from "../../../../database/Delete/DeleteExerciseDoneById.js";

import { db } from "../../../../database/DatabaseOpen.js";
import SafeViewAndroid from '../../../../components/SafeViewAndroid'

import DateHeader from "./DateHeader.js";
import WorkoutExercisesList from "./WorkoutExercisesList.js";
import { updateDoneExerciseDone } from "../../../../database/Requests/UpdateDoneExerciseDone.js";
import { addRecord } from "../../../../database/Requests/AddRecord.js";
import { deleteRecordByExerciseDone } from "../../../../database/Requests/DeleteRecordByExerciseDone.js";
import AddExerciseModal from "./AddExerciseModal.js";
import { formatDate } from "../../../../components/FormatDate.js";
import NoteButton from "./NoteButton.js";
import NoteModal from "./NoteModal.js";
import { noteSave } from "../../../../database/Requests/Note.js";
import DeleteExerciseModal from "./DeleteExerciseModal.js";

export default function DayDetailsScreen({ route, navigation }) {

    const {selectedDay} = route.params
  const {sdata}=route.params
   

  const [data,setData] = React.useState(sdata)
    const [deleteModalVisible,setDeleteModalVisible] = React.useState(false)
    const [addModalVisible,setAddModalVisible] = React.useState(false)
    const [selectedDeleteValue,setSelectedDeleteValue] = React.useState()
    const [selectedAddValue,setSelectedAddValue] = React.useState()
     const [selectedExerciseName,setSelectedExerciseName] = React.useState()
     const [refresh,setRefresh] = React.useState(false)
     const [noteModalVisible,setNodeModalVisible] = React.useState(false)
     const [noteData, setNoteData] = React.useState()
  

    React.useEffect(()=>{
      getData()
      getNoteData()
    },[])

     const getData =  () =>{
        db.readTransaction(function(tx)
        {
            tx.executeSql('SELECT ed.id, weight, done,date,exerciseWorkoutDay_id, sets, repetitions, workoutDay_id, exercise_id,name,description '
                        +'FROM ExercisesDone ed '
                        +'LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id '
                        +'LEFT JOIN Exercises e ON e.id = ewd.exercise_id '
                        + 'WHERE date = "'
                        + formatDate(selectedDay) +'" '
                        ,[],function(_,res)
            {
                var temp = []

                for(let i = 0; i < res.rows.length ; i++)
                {
                    temp.push(res.rows.item(i))
                }
                setData(temp);
                
            })
        }, function(error){
            console.log('Transaction GET EXERCISEDONE (homescreen) DATA ERROR: ' + error.message);
        }, function() {
          console.log('Populated database (GetExercisesDoneData) OK');
          
        });
      }


      const getNoteData = ()=>{
        
        db.readTransaction(function(tx)
        {
          tx.executeSql('SELECT Count(*) as licz FROM NOTES WHERE date = "'+formatDate(selectedDay)+'"',[],function(_,res)
          {
            if(res.rows.item(0).licz >0)
            {
             
              tx.executeSql('SELECT content FROM NOTES WHERE date = "'+formatDate(selectedDay)+'"',[],function(_,res){

                setNoteData(res.rows.item(0).content)
              }), function(error){
                console.log('Transaction GET NOTE CONTENT (DayDetails) DATA ERROR: ' + error.message);
            }, function() {
              console.log('Populated database (DayDetails) OK');
              
            };
            }
            else{
              setNoteData("")
            }
          {
            }
        
          })
        })
      }

     
   
      const callbackNoteModal = () =>
      {
        setNodeModalVisible(false)
        noteSave(noteData,selectedDay)
      }

    
  

    const onConfirmDelete = () =>{
   
      if(selectedDeleteValue.done == 1)
    {
    //Check if this exerciseDone is a Record and if yes delete
      isExerciseARecord(selectedDeleteValue.id)
    
   

  
    }
    else{
      deleteExerciseDoneById(selectedDeleteValue.id);
    }
      deleteExerciseDoneById(selectedDeleteValue.id);
      getData()
       setDeleteModalVisible(false);
    setSelectedDeleteValue()
   }
   
   const setDeleteModalVisbleClearInput = (bool) =>
   {
    setDeleteModalVisible(bool)
    setSelectedDeleteValue()
   }


    


    

   
    const Buttons = () =>(
      <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
       {data.length > 0 && <Button style={{flex: 1, borderRadius: 12}} title="Delete Exercise" color='red' onPress={()=>{setDeleteModalVisible(true)}}/>}
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
 
   data.splice(index,1,temp) 
   setRefresh(!refresh)
  updateDoneExerciseDone(temp.id,temp.done)
  if(temp.done == 0)
  {
    //Check if this exerciseDone is a Record and if yes delete
      isExerciseARecord(temp.id)
    
   
  }
  else if(temp.done == 1)
  {
   
   //Estimating potential record 
    let estORM;
    if(temp.repetitions > 1)
    {
       estORM = Math.round(temp.weight * (1 + (temp.repetitions/30))*100)/100
    }
    else{
       estORM = temp.weight
    }
    //Check if this estimated value is a record and set record
    isThisANewRecord(temp.exercise_id,estORM,temp.id,formatDate(selectedDay))
   // console.log(isRecord)
    // if(isRecord)
    // {
    //   console.log(isRecord +'sprawdzam')
    //   //Save record
    //   addRecord(temp.id,estORM,formatDate(selectedDay))
    // }

    
    //console.log(isRecord)
  }
   }


  function isThisANewRecord(id,weight,tempid,date)
  {
    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT count(*) as licz FROM Records r '
        +'LEFT JOIN ExercisesDone ed ON r.exerciseDone_id = ed.id '
        +'LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id '
        +'WHERE exercise_id = ? and ed.weight > ?',[id,weight],function(_,res)
        {
       
            if(res.rows.item(0).licz > 0)
            {
               setIsRecord(false);
               console.log('setrecord false')
            }
            else
            {
              addRecord(tempid,weight,date)
              console.log('setrecord true')
          
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
    
            if(res.rows.item(0).licz > 0)
            {
             
             deleteRecordByExerciseDone(exerciseDone_id)
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
    <SafeAreaView style = {SafeViewAndroid.AndroidSafeArea}>
    <View style={styles.data}>
      <DateHeader
      selectedDay={selectedDay}
      navigation={navigation}
      />
    </View>
    <View style= {styles.tabled}>   
    <View style={{flex: 1}}>
                    <WorkoutExercisesList
                    data={data}
                    callbackDone={callbackDone}
                    extraData={refresh}
                    />
                </View>
                </View>
                <View style={styles.container}>
                <Buttons/>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <NoteButton
                setNodeModalVisible={setNodeModalVisible}
                />
                </View>
                <AddExerciseModal
                addModalVisible={addModalVisible}
                setAddModalVisible={setAddModalVisible}
                selectedDay={selectedDay}
                getData={getData}
                />
        <DeleteExerciseModal
        data={data}
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisbleClearInput}
        selectedDeleteValue={selectedDeleteValue}
        setSelectedDeleteValue={setSelectedDeleteValue}
        onConfirmDelete={onConfirmDelete}
        />
        <NoteModal
        noteModalVisible={noteModalVisible}
        callback ={callbackNoteModal}
        selectedDay={selectedDay}
        noteData={noteData}
        setNoteData={setNoteData}
        />
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
    flex: 2,
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
    borderRadius: 12,
    // margin: 50,
    // padding: 40
  },
  item: {
    backgroundColor: '#B22222',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12
  },
  flatcontainer: {
    flexGrow: 1
  }
});
