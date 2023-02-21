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
  //  console.log(trainingList)

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
            <View style={{flex: 2}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>{item.name}</Text>
            </View>
            <View style={{flex: 1,flexDirection: 'column'}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>Sets {item.sets}</Text>
            <Text style={{fontSize: 16,textAlign: 'center'}}>Reps {item.repetitions}</Text>
            </View>
            <View style={{flex: 1,flexDirection:'column'}}>
                <Text style={{fontSize: 16, textAlign: 'center'}}>%1RM</Text>
                <Text style={{fontSize: 16,textAlign: 'center' }}>{item.orm}</Text>
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
            <Text>This day doesn't contain any exercise</Text>
        </View>
    )
    else{
        return(
           
                <View style={{flex: 1, padding: 12}}>
                <FlatList
                    data={trainingList}
                    renderItem={renderItem}
                    keyExtractor={item =>item.id}
                />
                </View>
        
        )
    }
}


const styles = StyleSheet.create({
      item: {
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 12,
        flexDirection: 'row',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
      },
})