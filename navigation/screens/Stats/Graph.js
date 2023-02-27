import * as React from 'react'
import {View, Text} from 'react-native'
  import { VictoryChart, VictoryLine,VictoryTheme } from "victory-native";



export default function Graph({data})
{
    
    if(data.length > 1)
    {
    return(
       
            
                <VictoryChart minDomain={{ y: 0 }}
                theme={VictoryTheme.material}
                >
                
                  
                <VictoryLine
                data={data}
            x="x"
            y="y"
            style={{
              data: { stroke: "#3573ca" }
            }}

          />
        </VictoryChart>
        

                
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