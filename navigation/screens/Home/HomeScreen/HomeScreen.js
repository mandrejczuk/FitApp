import * as React from 'react'
import {SafeAreaView,View,ScrollView} from 'react-native'
import { db } from '../../../../database/DatabaseOpen';
import WorkoutBox from './WorkoutBox';
import CalendarComponent from './CalendarComponent';
import { getDatesRng } from '../../../../database/Requests/GetDatesRng';
import DateText from './DateText';
import NavigationButton from './NavigationButton';
import SafeViewAndroid from '../../../../components/SafeViewAndroid';
import ModalPlanning from './ModalPlan';

export default function HomeScreen({navigation})
{
     
   

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [selectedDay,setSelectedDay] = React.useState((new Date()).toLocaleDateString('en-US',DATE_OPTIONS))
    const [markedDates,setMarkedDays] = React.useState({})
    const [data,setData] = React.useState([])
    const [dates,setDates] = React.useState(getDatesRng())
    const [modalVisible,setModalVisible] = React.useState(false)
    React.useEffect(()=>{
        getData()
        getDates()
        
       
        dates.forEach((val)=>
        {      
                let temp = markedDates
       if(val.date == formatDate(selectedDay))
       {
            temp[val.date] = {marked: true}
       }
       else
       {

       
         temp[val.date] = {marked: true}
       }
        
         setMarkedDays(temp)
         
        })
        console.log(markedDates)
         

        
        const unsubscribe = navigation.addListener('focus', () => {
           getData()
           getDates()
          });
      
          return unsubscribe;

    },[selectedDay,navigation])
    


    const navigateDetails = () =>
    {
        const sdata = data
      
        navigation.navigate('DayDetails',{selectedDay,sdata})
    } 

    const navigatePlaningWorkout = () =>
    {
        navigation.navigate('CreateTraining',{selectedDay})
    }

    const setModalTrue = () =>
    {
        setModalVisible(true)
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
              temp[val.date] = {marked: true}
         }
         else
         {
  
         
           temp[val.date] = {marked: true}
         }
          
           setMarkedDays(temp)
          })
          console.log(markedDates)
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
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} >
            <ScrollView style={{flex: 1}}>
        <CalendarComponent
        markedDates={markedDates}
       dayPressHandler={dayPressHandler}
        dayLongPressHandler={dayLongPressHandler}
        />
         </ScrollView>
            <DateText
            date={selectedDay}
            />
            <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
            <WorkoutBox 
            data ={data} 
            />
            </View>
            <NavigationButton
            navigateDetails={navigateDetails}
            data={data}
            setModalTrue={setModalTrue}
            />
            <ModalPlanning
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigateDetails={navigateDetails}
            navigatePlaningWorkout={navigatePlaningWorkout}/>
        </SafeAreaView>
    )

   
    
}

