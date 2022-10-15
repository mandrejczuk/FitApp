import * as React from 'react'
import {View, Text} from 'react-native'


class  ExercisesScreen extends React.Component{


    
    render()
    {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
            onPress={() => navigation.navigate('Home')}
            style={{fontSize: 26, fontWeight: 'bold' }}></Text>
        </View>
    )
    }
}
export default ExercisesScreen