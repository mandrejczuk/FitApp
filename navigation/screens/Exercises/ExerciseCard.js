import * as React from 'react';
import { View, Text,StyleSheet, Pressable,SafeAreaView,FlatList,StatusBar,Modal} from "react-native";
import { db } from '../../../database/DatabaseOpen';

export function ExerciseCards({callback,data})
{
  //   const [data,setData] = React.useState();
  //   const [category,setCategory] = React.useState();
  //   const [equipment,setEquipment] = React.useState();

  //  React.useEffect(() => {
  //       getData();
  //       setCategory(categoryValue());
  //       setEquipment(equipmentValue())
  //   }, [categoryValue(),equipmentValue()]);

  
  // const getData = () =>{
  //   db.readTransaction(function(tx)
  //   {
       
  //        tx.executeSql('SELECT Distinct e.* FROM Exercises e '
  //        + 'LEFT JOIN ExercisesBase eb ON e.exerciseBase_id = eb.id ' 
  //        + 'LEFT JOIN Categories C  ON eb.category_id = c.id '
  //        + 'LEFT JOIN ExercisesBase_Equipments eeb ON eb.id = eeb.exerciseBase_id ' 
  //        + 'LEFT JOIN Equipments eq ON eeb.equipment_id = eq.id  '
  //        + 'WHERE '
  //       //  + 'equipment_id IN '+ equipment 
  //        + 'category_id IN ' + category
  //        ,[],function(_,res)
  //       {      
  //          var temp =[]; 
  //            console.log(category)
  //          for (let i = 0; i < res.rows.length; i++) {
  //           temp.push(res.rows.item(i));
  //          }
  //          setData(temp)
  //          //console.log(data)
  //       })

  //   }, function(error){
  //       console.log('Transaction GET EXERCISE DATA ERROR: ' + error.message);
  //       console.log(category)
  //   }, function() {
  //     console.log('Populated database (GetExerciseData) OK');
  //   });
  // }

  // SELECT COUNT(*) FROM Exercises e LEFT JOIN ExercisesBase eb ON e.exerciseBase_id = eb.id LEFT JOIN Categories C  ON eb.category_id = c.id LEFT JOIN ExercisesBase_Equipments eeb ON eb.id = eeb.exerciseBase_id LEFT JOIN Equipments eq ON eeb.equipment_id = eq.id 

  const Item = ({ item }) => {
    return(
    <View style={styles.item}>
      {/* <Modal 
      transparent={true}
      animationType='slide'
      visible={modalVisible}
      onRequestClose = {() => {
        setModalVisible(!modalVisible)
      }}
      >
        <Pressable
         onPress={()=>{
          console.log(name)
          setModalVisible(!modalVisible)
          }}>
            <View style={styles.modalViewfuul}>
      <Text style={styles.name}>test</Text>
      </View>
      </Pressable>
      </Modal> */}
      <Pressable
      onPress={()=>{
        callback(item)
        }}>
      <Text style={styles.name}>{item.name}</Text>
      </Pressable>
    </View>
  )};


  const renderItem = ({ item }) => (
    <Item item={item} />
  );

    if(data != null && data.length > 0)
    {
      
        return (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          );
    }
    else if(data.length == 0 && data != null)
    {
      
      return(
        <View>
          <Text>
            There is no exercises in our database with specified category and
            equipment
          </Text>
        </View>
      );
    }
    else{

        return(
            <View>
                <Text>data nie zaladowala sie poprawnie</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#5176FD',
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 12,
      borderRadius: 12
    },
    name: {
      fontSize: 26,
    },
    modal:{
      backgroundColor: 'green'
    },
    modalViewfuul:{
      flex: 1,
      fontSize: 26,
      backgroundColor: '#000000aa',
      alignItems: 'center',
    }
  });