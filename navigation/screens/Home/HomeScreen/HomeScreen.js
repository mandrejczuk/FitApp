import * as React from 'react'
import {SafeAreaView,View, Text, StyleSheet,Modal, TouchableOpacity, TouchableWithoutFeedback, Button, ScrollView} from 'react-native'
import {Calendar,CalendarUtils} from 'react-native-calendars'
import { db } from '../../../../database/DatabaseOpen';
import WorkoutBox from './WorkoutBox';
import { getAllExercises } from '../../../../database/Requests/GetAllExercises';
import { useIsFocused } from '@react-navigation/native';
import CalendarComponent from './CalendarComponent';
import { getDatesRng } from '../../../../database/Requests/GetDatesRng';

export default function HomeScreen({navigation})
{

    
     

    //Select * FROM ExercisesDone ed LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id LEFT JOIN Exercises e ON e.id = ewd.exercise_id
    //rozwiazanie

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [selectedDay,setSelectedDay] = React.useState((new Date()).toLocaleDateString('en-US',DATE_OPTIONS))
    const [markedDates,setMarkedDays] = React.useState({})
    const [data,setData] = React.useState([])
    const [dates,setDates] = React.useState(getDatesRng())
    const [modalVisible,setModalVisible] = React.useState(false)
    const [show,setShow] = React.useState(true)
   // const [update,setUpdate] = React.useState(false);
    React.useEffect(()=>{
        getData()
        getDates()
        
       
        dates.forEach((val)=>
        {      
                let temp = markedDates
       if(val.date == formatDate(selectedDay))
       {
            temp[val.date] = {marked: true, selected:true}
       }
       else
       {

       
         temp[val.date] = {marked: true}
       }
        
         setMarkedDays(temp)
        })
        

        
        const unsubscribe = navigation.addListener('focus', () => {
           getData()
           getDates()
          });
      
          return unsubscribe;

    },[selectedDay,navigation])
    


    const navigateDetails = () =>
    {
      
        navigation.navigate('DayDetails',{selectedDay,data})
    } 

    const navigatePlaningWorkout = () =>
    {
        navigation.navigate('CreateTraining',{selectedDay})
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

    const getDates = () =>{
        db.readTransaction(function(tx)
        {
            tx.executeSql('SELECT Distinct date FROM ExercisesDone ',
            [],function(_,res)
            {
                var temp =[]

                for(let i = 0 ; i < res.rows.length ; i++)
                {
                    temp.push(res.rows.item(i))
                }
                setDates(temp)

            })
        }, function(error){
            console.log('Transaction GET DATES EXERCISES DONE (homescreen) DATA ERROR: ' + error.message);
        }, function() {
          console.log('Populated database (GET DATES EXERCISESDONE) OK');
          dates.forEach((val)=>
          {      
                  let temp = markedDates
         if(val.date == formatDate(selectedDay))
         {
              temp[val.date] = {marked: true, selected:true}
         }
         else
         {
  
         
           temp[val.date] = {marked: true}
         }
          
           setMarkedDays(temp)
          })
          console.log(dates)
          
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
            <ScrollView>
        <CalendarComponent
        markedDates={markedDates}
       dayPressHandler={dayPressHandler}
        dayLongPressHandler={dayLongPressHandler}
        show={show}
        setShow={setShow}
        />
         </ScrollView>
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
        backgroundColor:'yellow'
    },
    textContainer: {
        flex: 1,
    },
    calendarKeyContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    calendar: {
        marginBottom: 10
      },
      workoutBoxContainer: {
        flex: 3,
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