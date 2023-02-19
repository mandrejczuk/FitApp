import * as React from 'react'
import {View,Button} from 'react-native'

export default function NavigationButton({navigateDetails,data,setModalTrue})
{
    return(
        <View style = {{margin: 10, width: '75%', alignSelf: 'center'}}>
        {data.length > 0 
        ?
        <Button
        title='Check Details'
        color='#3CB371'
        onPress={()=> navigateDetails()}
        />
        :
        <Button
        title='Plan your day'
        color='#6495ed'
        onPress={()=> setModalTrue()}
        >
            </Button>
        }
    </View>
    )
}