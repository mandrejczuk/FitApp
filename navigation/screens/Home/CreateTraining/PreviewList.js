import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable, TextInput } from 'react-native'
import * as React from 'react'


export default function PreviewList({trainingList})
{
    // const [exerciseWeight,setExerciseWeight] = React.useState([
    //     {
            
    //     }
    // ])
    // console.log(trainingList)

    // const getItemId = (item) => 
    // {
    //     console.log(exerciseWeight)
    //     console.log(exerciseWeight.findIndex(element=>element.id == item.id))
    //     return exerciseWeight.findIndex(element=>element.id == item.id)
    // }
    console.log(trainingList)

    //console.log(exerciseWeight)
    const renderItem = ({item}) =>
    {
        
        return (
            <Item item = {item}/>
        )
    }

    const Item = ({item}) =>
    {
        // exerciseWeight.push({
        //     id: item.id,
        //     weight: ''
        // })

        return(
            <View style={styles.item}>
            <View style={{flex: 2,justifyContent: 'center'}}>
            <Text>{item.name}</Text>
            </View>
            <View style={{flex: 1,flexDirection: 'column', alignItems: 'center'}}>
            <Text>Sets {item.sets}</Text>
            <Text>Reps {item.repetitions}</Text>
            </View>
            <View style={{flex: 1,flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                <Text>%1RM</Text>
                <Text>{item.orm}</Text>
            </View>
            {/* <View style={{flex: 1, flexDirection: 'column', justifyContent :'center', alignItems: 'center'}}>
                <Text>Weight</Text>
                <TextInput 
                 style= {{fontSize: 12}} 
                value={exerciseWeight[getItemId(item)].weight} 
                placeholder= 'Enter Weight'
                keyboardType='numeric'
                ></TextInput>
            </View> */}
            </View>
        )
    }

    if(trainingList.length == 0)
    return(
        <View>
            <Text>Lista</Text>
        </View>
    )
    else{
        return(
            <View>
                <ScrollView>
                <View style={{flex: 1,alignItems: 'center'}}>
                <FlatList
                    data={trainingList}
                    renderItem={renderItem}
                    keyExtractor={item =>item.id}
                    style={{borderStyle:'solid',borderWidth: 1, borderColor: 'black'}}
                />
                </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
      item: {
        backgroundColor: '#5176FD',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 12,
        flexDirection: 'row'
      },
})