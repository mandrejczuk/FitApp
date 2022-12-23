import * as React from 'react'
import {SafeAreaView,View, Text, StyleSheet,} from 'react-native'
import {Calendar,CalendarUtils} from 'react-native-calendars'
import { db } from '../../../database/DatabaseOpen';
import WorkoutBox from './WorkoutBox';

export default function HomeScreen({navigation})
{
    


    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [selectedDay,setSelectedDay] = React.useState((new Date()).toLocaleDateString('en-US',DATE_OPTIONS))
    const [markedDates,setMarkedDays] = React.useState({})
    const [data,setData] = React.useState([])
    
    React.useEffect(()=>{
        getData()
    },[markedDates])

   

    const getData =  () =>{
        db.readTransaction(function(tx)
        {
           let xd = tx.executeSql('SELECT * FROM ExercisesDone',[],function(_,res)
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
       let newDate = (new Date(date.dateString)).toLocaleDateString('en-US',DATE_OPTIONS)
        setSelectedDay(newDate)
        navigation.navigate('DayDetails',{newDate})
        
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
            <WorkoutBox 
            data ={data} 
            selectedDay = {selectedDay} />
        </SafeAreaView>
    )

   
    
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 3,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendarKeyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendar: {
        marginBottom: 10
      },
   
})