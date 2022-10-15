import {View,Text,Label,StyleSheet} from 'react-native';
import * as React from 'react'

export default function BMISlider(props)
{
  
  if(props.result<18.5){
    return(
<View style={{flex: 1}}>
  <View style ={{flex: 1}}/>
  <View style={styles.header} >
  <Text style={{fontSize: 44,fontWeight:'bold', color: '#5a8be0' }}>Underweight</Text>
  </View>
  <View style={styles.descriptionBmi}>
    <Text style={{fontSize: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", borderRadius: 12, padding: 6,
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}> The WHO regards a BMI of less than 18.5 as underweight and may indicate malnutrition, an eating disorder, or other health problems.</Text>
  </View>
  <View style = {{flex: 1}}/>
</View>
    )
  }
  else if(props.result >= 18.5 && props.result < 25){

    return(
      <View style={{flex: 1}}>
      <View style ={{flex: 1}}/>
      <View style={styles.header} >
      <Text style={{fontSize: 44,fontWeight:'bold', color: '#11b866' }}>Normal</Text>
      </View>
      <View style={styles.descriptionBmi}>
        <Text style={{fontSize: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", borderRadius: 12, padding: 6,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,}}> A BMI between 18.5 and 25 is considered normal and healthy.</Text>
      </View>
      <View style = {{flex: 1}}/>
    </View>
    )
  }
  else if(props.result >= 25 && props.result < 30){

    return(
      <View style={{flex: 1}}>
      <View style ={{flex: 1}}/>
      <View style={styles.header} >
      <Text style={{fontSize: 44,fontWeight:'bold', color: '#f8c42b' }}>Pre-obesity</Text>
      </View>
      <View style={styles.descriptionBmi}>
        <Text style={{fontSize: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", borderRadius: 12, padding: 6,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,}}> People who fall into this category may be at risk of developing obesity.
    This was earlier classified as "overweight".</Text>
      </View>
      <View style = {{flex: 1}}/>
    </View>
    )
  }
  else if(props.result >= 30 && props.result < 35){

    return(
      <View style={{flex: 1}}>
      <View style ={{flex: 1}}/>
      <View style={styles.header} >
      <Text style={{fontSize: 44,fontWeight:'bold', color: '#f68d21' }}>Obese I</Text>
      </View>
      <View style={styles.descriptionBmi}>
        <Text style={{fontSize: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", borderRadius: 12, padding: 6,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,}}> People who have BMI equal or over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health.</Text>
      </View>
      <View style = {{flex: 1}}/>
    </View>
    )
  }
  else if(props.result >= 35 && props.result < 40){

    return(
      <View style={{flex: 1}}>
      <View style ={{flex: 1}}/>
      <View style={styles.header} >
      <Text style={{fontSize: 44,fontWeight:'bold', color: '#fa6b57' }}>Obese II</Text>
      </View>
      <View style={styles.descriptionBmi}>
        <Text style={{fontSize: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", borderRadius: 12, padding: 6,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,}}> People who have BMI equal or over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health.</Text>
      </View>
      <View style = {{flex: 1}}/>
    </View>
    )
  }
  else if(props.result >= 40){

    return(
      <View style={{flex: 1}}>
      <View style ={{flex: 1}}/>
      <View style={styles.header} >
      <Text style={{fontSize: 44,fontWeight:'bold', color: '#c7240b' }}>Obese III</Text>
      </View>
      <View style={styles.descriptionBmi}>
        <Text style={{fontSize: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", borderRadius: 12, padding: 6,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,}}> People who have BMI equal or over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health.</Text>
      </View>
      <View style = {{flex: 1}}/>
    </View>
    )
  }
  else{
    return(
      <View style = {{flex: 1}}>
        <View style = {{flex: 1}}/>
      <View style={styles.shadowbox}>
      <View style={styles.description}>
        <Text style ={{fontSize: 20}}>Body Mass Index (BMI) is a person’s weight in kilograms (or pounds) divided by the square of height in meters (or feet). A high BMI can indicate high body fatness. BMI screens for weight categories that may lead to health problems, but it does not diagnose the body fatness or health of an individual.</Text>
      </View>
      </View>
      <View style = {{flex: 1}}/>
      </View>
      )
  }
      
     

  }


const styles = StyleSheet.create({
 
  header :{
    flex : 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  descriptionBmi: {
    flex: 8,
    margin: 10,
    alignItems: 'center',
  },
  normal :{
    flex : 1,
    backgroundColor: "#11b866",
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preobesity :{
    flex : 1,
    backgroundColor: "#f8c42b",
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  obese1 :{
    flex : 1,
    backgroundColor: "#f68d21",
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  obese2 :{
    flex : 1,
    backgroundColor: "#fa6b57",
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  obese3 :{
    flex : 1,
    backgroundColor: "#c7240b",
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description :{
    flex: 1,
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  shadowbox: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: "#000",
    margin: 10,
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
  },
  }
)