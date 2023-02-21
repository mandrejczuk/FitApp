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
import SafeViewAndroid from '../../../../components/SafeViewAndroid'

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
      //  console.log(exercisesByDay)
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
                exerciseWorkoutDay_id: exercisesByDay[i].id,
                expectedValue: roundWeightValue((Math.round(exercisesByDay[i].value * exercisesByDay[i].orm)/100))
              }
            )
          }
          setExercisesDone(temp)
        }
        
    },[exercisesByDay])

    const roundWeightValue = (value)=>{
      if(value >= 2.5 )
      {
      if(value % 10 >= 0 && value % 10 <2.5)
      {
        return (value - value%10)
      }
      else if(value % 10 >= 2.5 && value % 10 < 5)
      {
        return (value - value%10 + 2.5)
      }
      else if(value % 10 >= 5 && value % 10 < 7.5)
      {
        return (value - value%10 + 5)
      }
      else if(value % 10 >= 7.5)
      {
        return (value - value%10 + 7.5)
      }
    }
    else{
      return 'Enter Weight'
    }
    }

    const addWorkout = () =>
    {
      
      exercisesDone.map(exercise =>{

      db.transaction(function(tx)
      {
       
        
          tx.executeSql('INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id) '
                      +'VALUES(?,?,?,?)',
                    [exercise.weight,0,exercise.date,exercise.exerciseWorkoutDay_id])
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
       
       
          
        
          // tx.executeSql('SELECT ewd.id,sets,repetitions, e.name,ewd.orm ' 
          // +'FROM Exercises_WorkoutDays ewd LEFT JOIN WorkoutDays wd ON ewd.workoutDay_id = wd.id '
          // +'LEFT JOIN Exercises e ON ewd.exercise_id = e.id '
          // +'WHERE wd.id = '+item
          tx.executeSql('SELECT ewd.id,sets,repetitions, name,ewd.orm, r.value '
          +'FROM WorkoutDays wd LEFT JOIN Exercises_WorkoutDays ewd ON wd.id = ewd.workoutday_id '
          +'LEFT JOIN (SELECT r.id,r.date,max(r.value) as value, ewd1.id as exerciseworkoutday_id '
          +'FROM Records r LEFT JOIN ExercisesDone ed1 ON ed1.id = r.exerciseDone_id '
          +'LEFT JOIN Exercises_WorkoutDays ewd1 ON ewd1.id = ed1.exerciseworkoutday_id '
          +'Group by ewd1.exercise_id) r '
          +'ON r.exerciseworkoutday_id = ewd.id '
          +'LEFT JOIN exercises e ON e.id = ewd.exercise_id '
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
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View >
            <TopBar/>
            </View>
            <View style ={{ padding: 12}}>
            <WorkoutList
            workouts={workouts}
            callback ={workoutListCallback}
            setWorkout ={setWorkout}
            />
            </View>
            { selectedWorkout !== undefined &&
            <View>
            <DayBar
            selectedWorkout={selectedWorkout}
            workoutDays={workoutDays}
            selectedWorkoutDay={selectedWorkoutDay}
            setWorkoutDay={setWorkoutDay}
            />
            </View>
}
{ selectedWorkout !== undefined && selectedWorkoutDay !== undefined &&
            <View style={{flex: 3}}>
              <PreviewList
              trainingList={exercisesByDay}/>
            </View>
}
            { selectedWorkout !== undefined &&
            <View style={{flex: 1}}>
            <AddBar
            setWeightModal={setWeightModalVisble}
            buttonDisabled={buttonDisabled}
            />
            </View>
}
            
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