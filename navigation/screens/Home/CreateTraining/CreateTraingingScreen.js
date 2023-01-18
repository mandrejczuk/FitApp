import * as React from 'react'
import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable } from 'react-native'
import WorkoutList from './WorkoutList'
import { db } from '../../../../database/DatabaseOpen'
import DescriptionModal from './DescriptionModal'
import TopBar from './TopBar'
import DayBar from './DayBar'

export default function CreateTrainingScreen({navigation})
{

    const [workouts,setWorkouts] = React.useState([])
    const [selectedWorkout,setSelectedWorkout] = React.useState()
    const [descriptionModalVisible,setDescriptionModalVisible] = React.useState(false)
    const [previewModalVisible,setPreviewModalVisible] = React.useState(false)
    const [selectedWorkoutDay,setSelectedWorkoutDay] = React.useState()
    const [desription,setDescription] = React.useState()

    React.useState(()=>{

        getAllWorkouts()
    },[])

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
            <View style ={{flex: 2}}>
            <WorkoutList
            workouts={workouts}
            callback ={workoutListCallback}
            />
            </View>
            <View style={{flex: 1}}>
            <DayBar/>
            </View>
            <DescriptionModal
            description = {desription}
            visible = {descriptionModalVisible}
            modalSet = {setDescriptionModalVisible}
            />
            
          
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   
})