import * as React from 'react'
import {View,Text,StyleSheet} from 'react-native'


export default function  WorkoutBox({data,selectedDay}){


    const Box = () =>
    {

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

        if(data.length == 0)
        {
            return(
                <View>
                    <Text>no trainign here</Text>
                </View>
            )
        }
        else{
            const temp = data.filter(el => el.date == formatDate(selectedDay))
            if(temp.length == 0)
            {
                return(
                    <View>
                        <Text>no trainign here</Text>
                    </View>
                )
            }
            else{
            
            return(
                <View>
                    <Text>{data[0].weight}</Text>
                </View>
            )
            }
        }

    }

    return(
        
        <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text>{selectedDay}</Text>
            </View>
            <View>
                <Box/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})