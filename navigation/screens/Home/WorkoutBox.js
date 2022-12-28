import * as React from 'react'
import {View,Text,StyleSheet, FlatList, Button} from 'react-native'
import getExerciseName from '../../../database/Requests/WorkoutBoxRequest'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function  WorkoutBox({data,selectedDay,cesz}){

    const temp = data.filter(el => el.date == formatDate(selectedDay))
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

    const renderItem = ({ item }) => (
        <Item item={item} />
   
      );

      const Item = ({ item }) => {
        return (
          <View style={styles.row}>
            <Text style={styles.name}>
              {getExerciseName(item.exerciseWorkoutDay_id)}{" "}
            </Text>
            <Text style={styles.name}>{item.weight}</Text>
            {item.done > 0 
            ? 
            (
              <Ionicons name="checkmark-outline" size="32px" color="green" />
            ) 
            : 
            (
              <Ionicons name="close-outline" size="32px" color="red" />
            )}
          </View>
        );
      };

    const Box = () =>
    {


        if(data.length == 0)
        {
            return(
                <View>
                    <Text>no trainign here</Text>
                </View>
            )
        }
        else{
            
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
                <View style={styles.box}>
                    <FlatList
                    data ={temp}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    />
                </View>
            )
            }
        }

    }

    return(
        
        <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{selectedDay}</Text>
            </View>
            <View>
                <Box/>
            </View>
            <View style = {{margin: 10}}>
                {temp.length > 0 
                ?
                <Button
                title='Navigate to this day'
                color= 'green'
                onPress={()=> cesz()}
                />
                :
                <Button
                title='Plan your day'
                onPress={()=> cesz()}
                />
                }
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
    item: {
        margin: 5,
    },
    name: {
        fontSize: 26,
      },
      row: {
        flex: 1,
        flexDirection:"row",
      },
      box: {
        flex: 1,
        backgroundColor: 'gray',
        margin: 10
      }
})