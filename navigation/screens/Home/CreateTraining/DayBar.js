import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable } from 'react-native'



export default function DayBar({selectedWorkout,workoutDays,selectedWorkoutDay,setWorkoutDay})
{

    const [placeholderEnabled,setPlaceHolderEnabled] = React.useState(true)
    
    const SelectedWorkout = () =>
    {
        return (
        <View>
            <Text>{selectedWorkout.name}</Text>
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
        <Picker 
        selectedValue = {selectedWorkoutDay}
        onValueChange = {(itemValue,itemIndex) =>
            {
                
                setWorkoutDay(itemValue)
                setPlaceHolderEnabled(false)
               
            }}
            >
                <Picker.Item label="Choose a Day" enabled={placeholderEnabled} value="disabled" color="#aaa"  />
                {renderWorkoutDaysList()}
            </Picker>
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