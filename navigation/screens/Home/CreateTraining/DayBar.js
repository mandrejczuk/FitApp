import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable } from 'react-native'



export default function DayBar({selectedWorkout,workoutDays,selectedWorkoutDay,setWorkoutDay})
{

    const [placeholderEnabled,setPlaceHolderEnabled] = React.useState(true)
    
    const SelectedWorkout = () =>
    {
        return (
        <View style={{padding: 12}}>
            <Text style={{ fontSize: 20}}>Selected workout: {selectedWorkout.name}</Text>
            <PickerWorkoutDay/>
        </View>
        )
    }

    const renderWorkoutDaysList = () =>
    {
        return workoutDays.map((day)=>{
            return <Picker.Item key={day.id} label = {day.type} value={day.id}/>
        })
    }

    const PickerWorkoutDay = () =>
    {
        return(
            <View style={{backgroundColor:'lightgrey',borderRadius: 12}}>
        <Picker 
        selectedValue = {selectedWorkoutDay}
        onValueChange = {(itemValue,itemIndex) =>
            {
                
                setWorkoutDay(itemValue)
                setPlaceHolderEnabled(false)
               
            }}
            >
                <Picker.Item style={{textAlign: 'center'}} label="Choose a Day" enabled={placeholderEnabled} value="disabled" color="#aaa"  />
                {renderWorkoutDaysList()}
            </Picker>
            </View>
        )
    }

    const NonSelectedWorkout = () => 
    (
        <Text>Choose Your Workout From List</Text>
    )

    if(typeof selectedWorkout ==='undefined')
    {
        return(
            <View>
            <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
            
            <NonSelectedWorkout/>
          
            
            </View>
        </View>
        )
    }
    else{

        return(

        <View>
        <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
        
        <SelectedWorkout/>
      
        
        </View>
    </View>
        )
    }

   
 }