import * as React from 'react'
import ProfileValues from './ProfileValues'
import { Alert, Dimensions,View, StatusBar,SafeAreaView, Pressable, TouchableOpacity } from "react-native";
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import RecordList from './RecordList';
import Graph from './Graph';
import { db } from '../../../database/DatabaseOpen';
import SafeViewAndroid from '../../../components/SafeViewAndroid';

//wykres, wybor cwiczenia, wybierz cwiczenie,pod wykrsem wypisane rekordy w flatlist
function StatsScreen ({navigation}) {
    
  const [exerciseData,setExerciseData] = React.useState()
  const [searchText,onChangeSearchText] = React.useState("")
  const [exercise,setExercise] = React.useState()
  const [listVisible,setListVisible] = React.useState(false)
  const [filteredData,setFilteredData] = React.useState()
  const [records,setRecords] = React.useState([])
  React.useEffect(()=>
  {
    if( typeof exerciseData === 'undefined')
    {
      getExerciseData()
    }
    if(searchText == "")
    {
      setFilteredData(exerciseData)
    }

    
  },[])

  const getExerciseData = () =>{
    
    db.readTransaction(function(tx)
    {
      tx.executeSql('SELECT id,name FROM Exercises',[],function(_,res)
      {
        var temp = [];

        for (let i = 0; i < res.rows.length; i++) {
          temp.push(res.rows.item(i));
         }
         setExerciseData(temp)
         setFilteredData(temp)
      })
    }, function(error){
      console.log('Transaction  EXERCISE DATA STATS SCREEN ERROR: ' + error.message);
  }, function() {
    console.log('Populated database (STAT SCREEn) OK');
  });
  }

  const getExerciseRecords = (item)=>
  {
    db.readTransaction(function(tx)
    {
      tx.executeSql('SELECT r.* FROM Records r '
                    +'LEFT JOIN ExercisesDone ed on ed.id = r.exerciseDone_id '
                    +'LEFT JOIN Exercises_WorkoutDays ewd ON ed.exerciseWorkoutDay_id = ewd.id '
                    +'WHERE ewd.exercise_id =' + item.id
                    +' ORDER BY r.date',[],function(_,res)
                    {
                      var temp = []
                      for (let i =0; i< res.rows.length; i++)
                      {
                        temp.push(
                          {x: res.rows.item(i).date, y: res.rows.item(i).value}
                        )
                      }
                      console.log(temp)
                      setRecords(temp)
                    } )    
    }, function(error){
      console.log('Transaction  RECORDS DATA STATS SCREEN ERROR: ' + error.message);
  }, function() {
    console.log('Populated database (RECORDS STAT SCREEn) OK');
  })
  }

  const callbackSearchBar = (text) =>
  {
    setListVisible(true)
    onChangeSearchText(text)
    if(text)
    {
    const newData = exerciseData.filter(item =>
      {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData)
    }
    else
    {
      setFilteredData(exerciseData)
    }
  }

  const callbackSearchlist = (item) =>
  {
    onChangeSearchText(item.name)
    setExercise(item)
    getExerciseRecords(item)
    setListVisible(false)
    console.log(item.name)
  }


    return(
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={{flex: 1, paddingHorizontal: 8}}>
        <SearchBar
        text={searchText}
        onChangeText={callbackSearchBar}
        setListVisble={setListVisible}
        />
       {listVisible && <SearchList style={{flex: 1}}
       data={filteredData}
       setItem={callbackSearchlist}

       />}
       <Pressable style={{flex: 1, paddingVertical: 10}}  onPress={()=>setListVisible(false)}>
        <Graph
        data={records}
        />
        {!listVisible && <RecordList
        data={records}
        />}
        </Pressable>
        </View>
       
      </SafeAreaView>
    )

    // const data = [
    //     { x: new Date(2022, 0, 26), y: 30 },
    //     { x: new Date(2022, 1, 1), y: 35 },
    //     { x: new Date(2022, 2, 1), y: 10 },
    //     { x: new Date(2022, 3, 1), y: 45 },
    //     { x: new Date(2022, 4, 1), y: 30 },
    //   ];
//     return(
//         <View style={{ flex: 1}} >
//         <VictoryChart>
//         <VictoryLine
//         data={data}
//     x="x"
//     y="y"
//     style={{
//       data: { stroke: "#c43a31" },
//     }}
//   />
// </VictoryChart> 
//         </View>
//     )
    
}

export default StatsScreen
