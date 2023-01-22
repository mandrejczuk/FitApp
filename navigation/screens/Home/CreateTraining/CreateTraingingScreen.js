import * as React from 'react'
import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable } from 'react-native'
import WorkoutList from './WorkoutList'
import { db } from '../../../../database/DatabaseOpen'
import DescriptionModal from './DescriptionModal'
import TopBar from './TopBar'
import DayBar from './DayBar'
import PreviewList from './PreviewList'
import AddBar from './AddBar'
import WeightModal from './WeightModal'
import { formatDate } from '../../../../components/FormatDate'

export default function CreateTrainingScreen({route,navigation})
{
 

    const {selectedDay} = route.params
    const [workouts,setWorkouts] = React.useState([])
    const [selectedWorkout,setSelectedWorkout] = React.useState()
    const [descriptionModalVisible,setDescriptionModalVisible] = React.useState(false)
    const [previewModalVisible,setPreviewModalVisible] = React.useState(false)
    const [selectedWorkoutDay,setSelectedWorkoutDay] = React.useState()
    const [desription,setDescription] = React.useState()
    const [workoutDays,setWorkoutDays] = React.useState([])
    const [exercisesByDay,setExercisesByDay] = React.useState([])
    const [buttonDisabled,setButtonDisabled] = React.useState(true)
    const [weightModalVisible,setWeightModalVisble] = React.useState(false)
    const [exercisesDone,setExercisesDone] = React.useState([])
    React.useEffect(()=>{

        getAllWorkouts()

        if(typeof selectedWorkoutDay !=='undefined')
        {
          setButtonDisabled(false)
        }
        console.log(exercisesByDay)
        if(exercisesByDay != [])
        {
          var temp = []
          for(let i = 0  ; i < exercisesByDay.length ; i++)
          {
            temp.push(
              {
                id: i,
                name: exercisesByDay[i].name,
                weight: '',
                done: false,
                date:  formatDate(selectedDay),
                exerciseWorkoutDay_id: exercisesByDay[i].id
              }
            )
          }
          setExercisesDone(temp)
        }
        
    },[exercisesByDay])



    const addWorkout = () =>
    {
      
      exercisesDone.map(exercise =>{

      db.transaction(function(tx)
      {
       
        
          tx.executeSql('INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id) '
                      +'VALUES(?,?,?,?)',
                    [exercise.weight,false,exercise.date,exercise.exerciseWorkoutDay_id])
      },
      function (error) {
        console.log("Transaction ERROR data delete: " + error.message);
      },
      function () {
        console.log("Populated database (data delete) OK");
      }
    ); })   
    
    goBack()
    }

    const goBack = ()=>
    {
   
    navigation.goBack()
    }

    const setWorkout =(item) =>
    {
      getWorkoutDays(item)
      setSelectedWorkout(item)
      
    }


    const setWorkoutDay = (item) =>
    {
      getExercisesByDay(item)
      setSelectedWorkoutDay(item)
      setButtonDisabled(false)
    }


    function getExercisesByDay(item)
    {

      db.readTransaction(function(tx)
      {
       
        
          tx.executeSql('SELECT ewd.id,sets,repetitions, e.name,ewd.orm ' 
          +'FROM Exercises_WorkoutDays ewd LEFT JOIN WorkoutDays wd ON ewd.workoutDay_id = wd.id '
          +'LEFT JOIN Exercises e ON ewd.exercise_id = e.id '
          +'WHERE wd.id = '+item
          ,[],function(_,res)
          {
              var data = []
              
              for(let i = 0; i < res.rows.length ; i++)
              {
                  data.push(res.rows.item(i))
              }
            setExercisesByDay(data)
          })
      },
      function (error) {
        console.log("Transaction ERROR data delete: " + error.message);
      },
      function () {
        console.log("Populated database (data delete) OK");
      }
    ); 
    }

    function getWorkoutDays(item)
    {
      db.readTransaction(function(tx)
      {
       
        
          tx.executeSql('SELECT * FROM WorkoutDays WHERE workout_id = '+item.id,[],function(_,res)
          {
              var data = []
              
              for(let i = 0; i < res.rows.length ; i++)
              {
                  data.push(res.rows.item(i))
              }
            setWorkoutDays(data)
          })
      },
      function (error) {
        console.log("Transaction ERROR data delete: " + error.message);
      },
      function () {
        console.log("Populated database (data delete) OK");
      }
    ); 
    }

 function getAllWorkouts()
{
  

    db.readTransaction(function(tx)
    {
       
        tx.executeSql('SELECT * FROM Workouts WHERE id != '+1,[],function(_,res)
        {
            var data = []
            
            for(let i = 0; i < res.rows.length ; i++)
            {
                data.push(res.rows.item(i))
            }
          setWorkouts(data)
        })
    },
    function (error) {
      console.log("Transaction ERROR data delete: " + error.message);
    },
    function () {
      console.log("Populated database (data delete) OK");
    }
  ); 
  
}


const workoutListCallback = (item) =>
{
  setDescription(item.description)
  setDescriptionModalVisible(true)
}

   
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
            <TopBar/>
            </View>
            <View style ={{flex: 3, backgroundColor: 'yellow'}}>
            <WorkoutList
            workouts={workouts}
            callback ={workoutListCallback}
            setWorkout ={setWorkout}
            />
            </View>
            <View style={{flex: 1}}>
            <DayBar
            selectedWorkout={selectedWorkout}
            workoutDays={workoutDays}
            selectedWorkoutDay={selectedWorkoutDay}
            setWorkoutDay={setWorkoutDay}
            />
            </View>
            <View style={{flex: 3, backgroundColor: 'pink'}}>
              <PreviewList
              trainingList={exercisesByDay}/>
            </View>
            <View style={{flex: 1}}>
            <AddBar
            setWeightModal={setWeightModalVisble}
            buttonDisabled={buttonDisabled}
            />
            </View>
            <DescriptionModal
            description = {desription}
            visible = {descriptionModalVisible}
            modalSet = {setDescriptionModalVisible}
            />
            <WeightModal
            visible={weightModalVisible}
            modalSet={setWeightModalVisble}
            exercisesDone={exercisesDone}
            setExercisesDone={setExercisesDone}
            addWorkout={addWorkout}
            />
           
            
          
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   
})