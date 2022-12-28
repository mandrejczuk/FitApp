import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DayDetailsScreen from "./screens/Home/DayDetailsSceen";
import HomeScreen from "./screens/Home/HomeScreen";

export default function HomeNavigation() {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DayDetails" component={DayDetailsScreen} />
    </HomeStack.Navigator>
  );
}
