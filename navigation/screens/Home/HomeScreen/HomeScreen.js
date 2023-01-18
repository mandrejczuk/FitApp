import * as React from 'react'
import {SafeAreaView,View, Text, StyleSheet,Modal, TouchableOpacity, TouchableWithoutFeedback, Button} from 'react-native'
import {Calendar,CalendarUtils} from 'react-native-calendars'
import { db } from '../../../../database/DatabaseOpen';
import WorkoutBox from './WorkoutBox';
import { getAllExercises } from '../../../../database/Requests/GetAllExercises';


export default function HomeScreen({navigation})
{
     

    //Select * FROM ExercisesDone ed LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id LEFT JOIN Exercises e ON e.id = ewd.exercise_id
    //rozwiazanie

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [selectedDay,setSelectedDay] = React.useState((new Date()).toLocaleDateString('en-US',DATE_OPTIONS))
    const [markedDates,setMarkedDays] = React.useState({})
    const [data,setData] = React.useState([])
    const [modalVisible,setModalVisible] = React.useState(false)
    React.useEffect(()=>{
        getData()

    },[selectedDay])
    
    // const exercises = getAllExercises()

    const navigateDetails = () =>
    {
      
        navigation.navigate('DayDetails',{selectedDay,data})
    } 

    const navigatePlaningWorkout = () =>
    {
        navigation.navigate('CreateTraining')
    }

    const setModalTrue = () =>
    {
        setModalVisible(true)
    }

    const ModalPlanning = () =>
    (
        <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={()=>{setModalVisible(false)}}
        >
        <TouchableOpacity
        style={styles.outer}
        activeOpacity={1}
        onPressOut={()=>{setModalVisible(false)}}
        >
            <TouchableWithoutFeedback>
                <View style={styles.inner}>
                    <Button title='YES' onPress={()=>{
                        setModalVisible(false)
                        navigatePlaningWorkout()}}/>
                    <Button title='NO'/>
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
        </Modal>
    )

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }  

   

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

    

    
    function dayLongPressHandler(date)
    {
        setSelectedDay((new Date(date.dateString)).toLocaleDateString('en-US',DATE_OPTIONS))
        if(selectedDay == (new Date(date.dateString)).toLocaleDateString('en-US',DATE_OPTIONS) )
        {
            navigation.navigate('DayDetails',{selectedDay,data})
        }
    
        
    }

    function dayPressHandler(date)
    {
        setSelectedDay((new Date(date.dateString)).toLocaleDateString('en-US',DATE_OPTIONS))
        
    }

    
    
    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.calendarContainer}>
            <Calendar
            markedDates={markedDates}
           onDayPress={date => dayPressHandler(date)}
            onDayLongPress={date => dayLongPressHandler(date)}
        />
            </View>
            <View style = {styles.calendarKeyContainer}>
            <Text>zaznaczenia kalendarza today, restday, workoutday,day pressed</Text>
            </View>
            <View style={styles.workoutBoxContainer}>
            <WorkoutBox 
            data ={data} 
            selectedDay = {selectedDay}
            navigateDetails = {navigateDetails}
            setModalTrue = {setModalTrue}
             />
            </View>
            <ModalPlanning/>
        </SafeAreaView>
    )

   
    
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 2,
        margin: 10,
    },
    textContainer: {
        flex: 1,
    },
    calendarKeyContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendar: {
        marginBottom: 10
      },
      workoutBoxContainer: {
        flex: 2,
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
   
})