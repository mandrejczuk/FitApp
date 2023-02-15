import * as React from 'react'
import ProfileValues from './ProfileValues'
import { Dimensions,View } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";


function StatsScreen ({navigation}) {
    
    const data = [
        { x: new Date(2022, 0, 26), y: 20 },
        { x: new Date(2022, 1, 1), y: 35 },
        { x: new Date(2022, 2, 1), y: 10 },
        { x: new Date(2022, 3, 1), y: 45 },
        { x: new Date(2022, 4, 1), y: 30 },
      ];
      

    
    return(
        <View style={{ flex: 1}} >
        <VictoryChart>
        <VictoryLine
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

export default StatsScreen
