import * as React from 'react'
import {View, Text} from 'react-native'
// import { VictoryChart, VictoryLine } from "victory-native";



export default function Graph({data})
{
    console.log(data)
    if(data.length > 0)
    {
    return(
        <View style={{ flex: 1}} >
            
                {/* <VictoryChart>
                <VictoryLine
                data={data}
            x="x"
            y="y"
            style={{
              data: { stroke: "#c43a31" },
            }}
          />
        </VictoryChart> */}

                </View>
    )
}
else{
    return(
    <View style={{flex: 1}}>
        <Text>essa</Text>
    </View>
    )
}
}