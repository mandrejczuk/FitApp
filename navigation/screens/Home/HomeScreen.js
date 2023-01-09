import * as React from 'react'
import {SafeAreaView,View, Text, StyleSheet,} from 'react-native'
import {Calendar,CalendarUtils} from 'react-native-calendars'
import { db } from '../../../database/DatabaseOpen';
import WorkoutBox from './WorkoutBox';


export default function HomeScreen({navigation})
{
     

    //Select * FROM ExercisesDone ed LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id LEFT JOIN Exercises e ON e.id = ewd.exercise_id
    //rozwiazanie

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [selectedDay,setSelectedDay] = React.useState((new Date()).toLocaleDateString('en-US',DATE_OPTIONS))
    const [markedDates,setMarkedDays] = React.useState({})
    const [data,setData] = React.useState([])
    React.useEffect(()=>{
        getData()

    },[selectedDay])

    const navigateDetails = () =>
    {
      
        navigation.navigate('DayDetails',{selectedDay,data})
    } 

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
            tx.executeSql('SELECT * FROM ExercisesDone ed '
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
             />
            </View>
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
      }
   
})