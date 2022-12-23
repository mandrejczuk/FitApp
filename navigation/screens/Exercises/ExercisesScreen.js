import * as React from "react";
import { View, Text, StyleSheet, Modal, Pressable,TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ExerciseCards } from "./ExerciseCard";
import { db } from '../../../database/DatabaseOpen';

function ExercisesScreen() {

  const [item,setItem] = React.useState('d')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [text, onChangeText] = React.useState("");
  const [categoryValue, setCategoryValue] = React.useState('(8,9,10,11,12,13,14,15)');
  const [equipmentValue, setEquipmentValue] = React.useState('("",1,2,3,4,5,6,7,8,9,10,11)');
  const [data,setData] = React.useState([])



  React.useEffect(()=>{
    getData()
  },[categoryValue,equipmentValue,text])

  const getData = () =>{
    db.readTransaction(function(tx)
    { 
       
         tx.executeSql('SELECT Distinct e.* FROM Exercises e '
         + 'LEFT JOIN ExercisesBase eb ON e.exerciseBase_id = eb.id ' 
         + 'LEFT JOIN Categories C  ON eb.category_id = c.id '
         + 'LEFT JOIN ExercisesBase_Equipments eeb ON eb.id = eeb.exerciseBase_id ' 
         + 'LEFT JOIN Equipments eq ON eeb.equipment_id = eq.id  '
         + 'WHERE '
         + 'equipment_id IN '+ equipmentValue
         + ' AND '
         + 'category_id IN ' + categoryValue
         + ' AND '
         + 'e.name LIKE ' + '"%' + text + '%"'  
         ,[],function(_,res)
        {      
           var temp =[]; 
            
           for (let i = 0; i < res.rows.length; i++) {
            temp.push(res.rows.item(i));
           }
           setData(temp)
           console.log(data)

        })

    }, function(error){
        console.log('Transaction GET EXERCISE DATA ERROR: ' + error.message);
    }, function() {
      console.log('Populated database (GetExerciseData) OK');
    });
  }

  function callbackFunction(item)
  {
    if(item.description != "")
    {
    setItem(item)
    setModalVisible(!modalVisible)
    }
  }

  

  
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder='Serach'
        style={styles.input}
      />
      </View>
      <View style = {styles.row}>
      <View style={styles.category}>
        <Picker
        selectedValue={categoryValue}
        onValueChange={(itemValue, itemIndex) =>  setCategoryValue(itemValue)}
        style={styles.pickercategory}
        >
        <Picker.Item label="All" value="(8,9,10,11,12,13,14,15)" />
        <Picker.Item label="Arms" value="(8)" />
        <Picker.Item label="Legs" value="(9)" />
        <Picker.Item label="Abs" value="(10)" />
        <Picker.Item label="Chest" value="(11)" />
        <Picker.Item label="Back" value="(12)" />
        <Picker.Item label="Shoulders" value="(13)" />
        <Picker.Item label="Calves" value="(14)" />
        <Picker.Item label="Cardio" value="(15)" />
        </Picker>
        
      </View>
      <View style={styles.equipment}>
        <Picker
        selectedValue={equipmentValue}
        onValueChange={(itemValue, itemIndex) => setEquipmentValue(itemValue)}
        style={styles.pickerequipment}
        >
        <Picker.Item label="All" value="('',1,2,3,4,5,6,7,8,9,10,11)" />
        <Picker.Item label="Barbell" value="(1)" />
        <Picker.Item label="SZ-Bar" value="(2)" />
        <Picker.Item label="Dumbbell" value="(3)" />
        <Picker.Item label="Gym mat" value="(4)" />
        <Picker.Item label="Swiss Ball" value="(5)" />
        <Picker.Item label="Pull-up bar" value="(6)" />
        <Picker.Item label="none" value="(7)" />
        <Picker.Item label="Bench" value="(8)" />
        <Picker.Item label="Incline bench" value="(9)" />
        <Picker.Item label="Kettlebell" value="(10)" />
        <Picker.Item label="Resistance Band" value="(11)" />
        </Picker>
      </View>
      </View>
      <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose = {() => {
        setModalVisible(!modalVisible)
      }}>
        <View style={styles.outer}>
        <Pressable
        onPress={()=>{
          console.log(item.name)
          setModalVisible(!modalVisible)}}>
          <View style={styles.inner}>
            <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        </View>       
        </Pressable>
        </View>
      </Modal>
      <View style={styles.container} >
      <ExerciseCards 
      callback ={callbackFunction}
      data = {data}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
  outer: {
    backgroundColor:'#000000aa',
    alignItems: "center",
     justifyContent: "center",
    flex: 1
  },
  inner:{
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 12
    // margin: 50,
    // padding: 40
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 20,
    margin: 10,
    padding: 2
  },
  row: {
    flexDirection: 'row',
    margin: 10
  },
  equipment:{
    flex: 1,
    
  },
  category: {
    flex: 1,
   
  },
  pickercategory:{
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    margin: 10,
  },
  pickerequipment:{
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    margin: 10,
  },
  inputView:{

  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 6
  },
  description: {
    fontSize: 12,
    padding: 6,
  }
});

export default ExercisesScreen;
