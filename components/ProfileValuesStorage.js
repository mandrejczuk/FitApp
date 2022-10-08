import * as React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function User()
{
    const [height,setHeight] = React.useState()
    const [weight,setWeight] = React.useState()

    _storeHeight = async () => {
        try {
          await AsyncStorage.setItem(
            'height',
            height
          );
        } catch (error) {
          // Error saving data
          alert("nieudalosie zapisac wzrostu")
        }
      };

      _storeWeight = async () => {
        try {
          await AsyncStorage.setItem(
            'weight',
            weight
          );
        } catch (error) {
          // Error saving data
          alert("nieudalosie zapisac wwagi")
        }
      };

      _retrieveHeight = async () => {
        try {
          setHeight( await AsyncStorage.getItem('height'));
          if (height !== null) {
            // We have data!!
            console.log(height);
          }
        } catch (error) {
          alert("wzrost = null")
        }
      };

      _retrieveWeight = async () => {
        try {
          setWeight( await AsyncStorage.getItem('weight'));
          if (height !== null) {
            // We have data!!
            console.log(weight);
          }
        } catch (error) {
          alert("waga = null")
        }
      };


}

