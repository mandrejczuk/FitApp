import { View,Text, FlatList, ScrollView,SafeAreaView,StyleSheet,Pressable } from 'react-native'



export default function TopBar()
{
    return(
        <View>
            <Text style={{fontSize: 24,fontWeight: '700',textAlign:'center'}}>Predefined workouts list</Text>
            <Text style={{fontSize: 16,fontWeight: '600',textAlign:'center',color: 'grey'}}>Click workout to select</Text>
        </View>
    )
}