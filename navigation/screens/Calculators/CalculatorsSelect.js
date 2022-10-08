import { Select,FormControl,Center,CheckIcon,WarningOutlineIcon,NativeBaseProvider } from "native-base";
import * as React from "react";
import { useState } from "react"
import BMIScreen from "./BMIScreen";
import ORMScreen from "./ORMScreen";

export default function CalculatorsSelect(props)
{
    return(
    
     <Center>
      <FormControl w="3/4" maxW="300" isRequired isInvalid>
        <FormControl.Label>Choose service</FormControl.Label>
        <Select 
        onValueChange={(selectedValue) => props.changeCalc(selectedValue)}
        minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Calculator" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size={5} />
      }} mt="1">
          <Select.Item label="BMI Calculator" value="BMI" />
          <Select.Item label="ORM Calculator" value="ORM" />
        </Select>
        {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage> */}
      </FormControl>
    </Center>
    )
}