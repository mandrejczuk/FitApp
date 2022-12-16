import * as React from 'react'
import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens

import HomeScreen from './screens/HomeScreen'
import ExercisesScreen from './screens/Exercises/ExercisesScreen'
import ProfileScreen from './screens/Profile/ProfileScreen'
import CalculatorsScreen from './screens/Calculators/CalculatorsScreen'

//Screen names
const homeName = 'Home'
const exercisesName ='Exercises'
const profileName = 'Profile'
const calculatorsName= 'Calculators'

const Tab = createBottomTabNavigator();

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
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if(rn === exercisesName)
                {
                    iconName = focused ? 'body' : 'body-outline'
                }
                else if(rn === calculatorsName)
                {
                    iconName = focused ? 'calculator' : 'calculator-outline'
                }
                else if(rn === profileName)
                {
                    iconName = focused ? 'person' : 'person-outline'
                }
              
               
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            
        })}>
            <Tab.Screen name = {homeName} component = {HomeScreen}/>
            <Tab.Screen name = {exercisesName} component = {ExercisesScreen}/>
            <Tab.Screen name = {calculatorsName} component = {CalculatorsScreen}/> 
            <Tab.Screen name = {profileName} component = {ProfileScreen}/>
       </Tab.Navigator>
       </NavigationContainer>
    )
}