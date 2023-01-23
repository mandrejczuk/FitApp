import * as React from 'react'
import {Calendar} from 'react-native-calendars'
import {View,Text} from 'react-native'
export default function CalendarComponent({markedDates,dayPressHandler,dayLongPressHandler,show,setShow})
{
   
   
    return(  
        <Calendar
        markedDates={markedDates}
       onDayPress={date => dayPressHandler(date)}
        onDayLongPress={date => dayLongPressHandler(date)}
    /> 
    )
}