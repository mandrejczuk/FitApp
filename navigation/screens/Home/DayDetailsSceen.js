import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function DayDetailsScreen({ route, navigation }) {

    const {selectedDay} = route.params
    const {data} = route.params
    console.log(selectedDay)
    console.log(data.length)


    

    const DateHeader = () =>(
      <View style={styles.header}>
    <Text style={styles.hdtext}>Workout plan on {selectedDay} </Text>
    <View style={styles.wrapRowTop}>
    <Text style={styles.hdtext}>click </Text>
    <Text style={styles.here} onPress={()=>navigation.navigate('HomeScreen')}>here </Text>
    <Text style={styles.hdtext}>to go back</Text>
    </View>
   
      </View>
    )

    const renderItem = ({ item }) => (
      <Item item={item} />
    );

    const header = () =>(
      <View style={styles.wrapRow}>
        <Text style={styles.row}>Name </Text>
        <Text  style={styles.row}>Weight [kg] </Text>
        <Text  style={styles.row}>Sets </Text>
        <Text  style={styles.row}>Reps </Text>
        <Text  style={styles.row}>Done </Text>
      </View>
    )

    const Item = ({ item }) => (
      <View style={styles.wrapRow}>
        <Text style={styles.row}>
          {item.name}{" "}
        </Text>
        <Text style={styles.row}>{item.weight} </Text>
        <Text style={styles.row}>{item.sets} </Text>
        <Text style={styles.row}>{item.repetitions} </Text>
        {item.done > 0 
        ? 
        (
          <Ionicons style={styles.icon} name="checkmark-outline" size="24px" color="green" />
        ) 
        : 
        (
          <Ionicons style={styles.icon} name="close-outline" size="24px" color="red" />
        )}
      </View>
    );

  return (
    <SafeAreaView style = {styles.container}>
    <View style={styles.data}>
      <DateHeader/>
    </View>
    <View style= {styles.tabled}>
    <View style={styles.box}>
                    <FlatList
                    data ={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={header}
                    />
                </View>
                </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapRowTop: {
    flexDirection:"row",
    flexWrap: "wrap",
    alignItems: 'center',
  },
  here:
  {
    fontSize: 26,
    fontWeight: '500',
    fontStyle:'italic',
    fontFamily: 'Verdana',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: '#CAC000',
    textAlign: 'center' 
  },
  hdtext:
  {
    color: '#1e1e1e',
    fontSize: 26,
  },
  backgroundText:{
    backgroundColor: '#1A2864',
    borderRadius: 12,
    textAlign: 'center'
  },
  data:{
    flex: 1
  },
  tabled:{
    flex: 2
  },
  header:{
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6
  },
  box: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: '50',
    borderWidth: '2px',
    justifyContent: 'center',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,

elevation: 13,
  },
  wrapRow: {
    flexDirection:"row",
    flexWrap: "wrap",
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
  },
  row:{
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 2,
    paddingVertical: 10,
    textAlign: 'center',
  },
  icon:{
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 10,
    textAlign: 'center'
  }
});
