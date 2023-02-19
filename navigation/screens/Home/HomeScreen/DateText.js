import * as React from "react";
import { Text, View } from "react-native";

export default function DateText({ date }) {
  return (
    <View>
      <Text style={{ fontSize: 26, textAlign: "center", fontWeight:'700', color:'#007aff' }}>{date}</Text>
    </View>
  );
}
