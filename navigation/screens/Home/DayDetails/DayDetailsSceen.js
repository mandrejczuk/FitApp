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

export default function DayDetailsScreen({ route, navigation }) {

    const {selectedDay} = route.params
  // const {data} = route.params
  const {sdata}=route.params
   
    // const {exercises} = route.params
    // console.log(selectedDay)
    // console.log(data)
 //   console.log(data.length)
  const [data,setData] = React.useState(sdata)
    const [deleteModalVisible,setDeleteModalVisible] = React.useState(false)
    const [addModalVisible,setAddModalVisible] = React.useState(false)
    const [selectedDeleteValue,setSelectedDeleteValue] = React.useState()
    const [selectedAddValue,setSelectedAddValue] = React.useState()
     const [selectedExerciseName,setSelectedExerciseName] = React.useState()
     const [refresh,setRefresh] = React.useState(false)
     const [isRecord,setIsRecord] = React.useState('setted')
     const [noteModalVisible,setNodeModalVisible] = React.useState(false)
     const [noteData, setNoteData] = React.useState()
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
              console.log('xdddd')
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

      // const noteVisible = () =>
      // {
      //   getNoteData()
      //   setNodeModalVisible(true)
      //   console.log(JSON.stringify(noteData))

      // }

  

    const onConfirmDelete = () =>{
      // console.log(JSON.stringify(data))
      // console.log(JSON.stringify(selectedDeleteValue))
      // const result = data.filter(exercise =>exercise.id == selectedDeleteValue)
      // const index = data.indexOf(result[0])
      // console.log(JSON.stringify(result))
   //   console.log(index)
    

//       const numbers = [1, 2, 3];
// const index = numbers.indexOf(3);
// if (index > -1) {
//   numbers.splice(index, 1);
// }
// console.log(numbers); 
      deleteExerciseDoneById(selectedDeleteValue.id);
      getData()
      //data.splice(index,1)
       setDeleteModalVisible(false);
     //  console.log(data)
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
            <Text style={{fontSize: 22,textAlign: 'center', fontWeight:'600',color: 'grey'}}>Click on exercise to delete</Text>
             <View style={{height: 150}}> 
          <ScrollView contentContainerStyle={{justifyContent:'center'}} style={{marginTop: 10, borderRadius: 10, padding: 6}}>
          {data.map((item,index)=>{
            return(
              <View style={styles.item} key={index}>
             <Pressable onPress={()=>setSelectedDeleteValue(item)}>
              <View>
                <Text style={{fontSize:18, textAlign:'center',fontWeight:'500'}}>{item.name} </Text>
              </View>
            </Pressable>
              </View>
            )
          })}
          </ScrollView>
          </View>
         
          
          <Text style={{fontSize: 20,textAlign: 'center', color: 'grey'}}> {selectedDeleteValue !== undefined ?selectedDeleteValue.name: 'Click on list above' }</Text>
          <Button color='red' title="Confirm Delete" onPress={() => {onConfirmDelete()}}/>
          </View>
          </TouchableWithoutFeedback>
          </TouchableOpacity>
      </Modal>
  )
    

   
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
   // console.log(temp)
   data.splice(index,1,temp) 
   setRefresh(!refresh)
  updateDoneExerciseDone(temp.id,temp.done)
  if(temp.done == 0)
  {
    //Check if this exerciseDone is a Record
      isExerciseARecord(temp.id)
    
   //   console.log(isRecord)
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
       estORM = Math.round(temp.weight * (1 + (temp.repetitions/30))*100)/100
    }
    else{
       estORM = temp.weight
    }
    //Check if this estimated value is a record
    isThisANewRecord(temp.exercise_id,estORM)
   // console.log(isRecord)
    if(isRecord)
    {
      //Save record
      addRecord(temp.id,estORM,formatDate(selectedDay))
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
        //    console.log(res.rows.item(0).licz)
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
       //   console.log(res.rows.item(0).licz)
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
        <DeleteExerciseModal/>
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
