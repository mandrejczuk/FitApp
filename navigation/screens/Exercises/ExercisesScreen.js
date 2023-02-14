import * as React from "react";
import {SafeAreaView, View, Text, StyleSheet, Modal, Pressable,TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ExerciseCards } from "./ExerciseCard";
import { db } from '../../../database/DatabaseOpen';
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <View style={styles.searchBorder}>
      <Ionicons style={styles.serachIcon} name='search-outline' size={24} color='#000' />
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder='Search'
        style={styles.input}
      />
      </View>
        
      </View>
      <View style = {styles.row}>
      <View style={styles.category}>
        <Text style={styles.textPicker}>Category</Text>
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
      <View style={{flex: 1}}/>
      <View style={styles.equipment}>
        <Text style={styles.textPicker}>Available Equipment</Text>
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
      <View style={styles.listContainter} >
      <ExerciseCards 
      callback ={callbackFunction}
      data = {data}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   paddingVertical: 18,
   paddingHorizontal: 8
  },
  listContainter: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
  textPicker:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
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
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  serachIcon: {
    padding: 10
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    flex: 1,
    justifyContent: 'space-evenly'
  },
  equipment:{
    flex: 3,
    
  },
  category: {
    flex: 3,
   
  },
  pickercategory:{
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginTop: 20,
    
  },
  pickerequipment:{
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    marginTop: 20,
  },
  inputView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchBorder:{
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'grey',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 2,
    alignItems: 'center'
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 6
  },
  description: {
    fontSize: 14,
    padding: 6,
    
  }
});

export default ExercisesScreen;
