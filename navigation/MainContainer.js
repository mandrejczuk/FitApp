import * as React from 'react'
import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens

// import HomeNavigation from './HomeNavigation'
import ExercisesScreen from './screens/Exercises/ExercisesScreen'
import StatsScreen from './screens/Stats/StatsScreen'
import CalculatorsScreen from './screens/Calculators/CalculatorsScreen'
import DayDetailsScreen from './screens/Home/DayDetails/DayDetailsSceen'
import HomeScreen from './screens/Home/HomeScreen/HomeScreen';
import  CreateTrainingScreen  from './screens/Home/CreateTraining/CreateTraingingScreen';

//Screen names
const homeName = 'Calendar'
const exercisesName ='Exercises'
const statsName = 'Stats'
const calculatorsName= 'Tools'

const Tab = createBottomTabNavigator();

const CalendarStack = createNativeStackNavigator();
const ExerciseStack = createNativeStackNavigator();  
const StatsStack = createNativeStackNavigator();
const ToolsStack = createNativeStackNavigator();

function ToolsNavigation()
{
    return(
        <ToolsStack.Navigator screenOptions={{headerShown: false}}>
            <ToolsStack.Screen name = "ToolsScreen" component={CalculatorsScreen}/>
        </ToolsStack.Navigator>
    )
}


function ExerciseNavigation()
{
    return(
        <ExerciseStack.Navigator screenOptions={{headerShown: false}}>
            <ExerciseStack.Screen name = "ExercisesScreen" component={ExercisesScreen}/>
        </ExerciseStack.Navigator>
    )
}

function StatsNavigation()
{
    return(
        <StatsStack.Navigator screenOptions={{headerShown: false}}>
            <StatsStack.Screen name = "StatsScreen" component={StatsScreen}/>
        </StatsStack.Navigator>
    )
}

function CalendarNavigation() {
    
    return (
      <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
        <CalendarStack.Screen name="HomeScreen" component={HomeScreen} />
        <CalendarStack.Screen name="DayDetails" component={DayDetailsScreen} />
        <CalendarStack.Screen name ="CreateTraining" component={CreateTrainingScreen}/>
      </CalendarStack.Navigator>
    );
  }

export default function MainContainer(){
    return(
       <NavigationContainer>
         <Tab.Navigator

        initialRouteName={homeName}
        screenOptions={({route}) =>({
            tabBarIcon: ({focused, color, size}) =>{
                let iconName
                let rn = route.name
                if(rn === homeName)
                {
                    iconName = focused ? 'calendar' : 'calendar-outline'
                }
                else if(rn === exercisesName)
                {
                    iconName = focused ? 'body' : 'body-outline'
                }
                else if(rn === calculatorsName)
                {
                    iconName = focused ? 'build' : 'build-outline'
                }
                else if(rn === statsName)
                {
                    iconName = focused ? 'stats-chart' : 'stats-chart-outline'
                }
              
               
                return <Ionicons name={iconName} size={size} color={color}/>
            },
           headerShown: false 
        })}>
            <Tab.Screen name = {homeName} component = {CalendarNavigation}/>
            <Tab.Screen name = {exercisesName} component = {ExerciseNavigation}/>
            <Tab.Screen name = {calculatorsName} component = {ToolsNavigation}/> 
            <Tab.Screen name = {statsName} component = {StatsNavigation}/>
       </Tab.Navigator>
       </NavigationContainer>
    )
}