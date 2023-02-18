import * as React from 'react'
import {View, Text} from 'react-native'
import { VictoryChart, VictoryLine } from "victory-native";



export default function Graph({data})
{
    console.log(data)
    if(data.length > 1)
    {
    return(
        <View style={{ flex: 1}} >
            
                <VictoryChart minDomain={{ y: 0 }}>
                <VictoryLine animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
labels={({ datum }) => datum.y}
                data={data}
            x="x"
            y="y"
            style={{
              data: { stroke: "#c43a31" },
            }}
          />
        </VictoryChart>

                </View>
    )
}
else{
    return(
      <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center',textAlignVertical: 'center', fontSize: 24, fontWeight: '600', color: 'grey'}}>Only one record recorded not enough to render progress graph</Text>
    </View>
    )
}
}