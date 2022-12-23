import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DayDetailsScreen({ route, navigation }) {

    const {newDate} = route.params
    console.log(newDate)
  return (
    <View>
    <View style={styles.container}>
      <Text>{newDate}</Text>
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
});
