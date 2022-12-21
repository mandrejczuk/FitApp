import * as React from 'react'
import {View, Text, StyleSheet,} from 'react-native'
import {Calendar,CalendarUtils} from 'react-native-calendars'

export default function HomeScreen()
{
    


    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [selectedDay,setSelectedDay] = React.useState((new Date()).toLocaleDateString('en-US',DATE_OPTIONS))
    const [markedDates,setMarkedDays] = React.useState({})
    


    
    
    return(
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
            <Calendar
            markedDates={markedDates}
           onDayPress={date =>{ setSelectedDay((new Date(date.dateString)).toLocaleDateString('en-US',DATE_OPTIONS))
            }}
        />
            </View>
            <View style = {styles.calendarKeyContainer}>
            <Text>s kalendarza today, restday, workoutday,day pressed</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>{selectedDay}</Text>
            </View>
        </View>
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