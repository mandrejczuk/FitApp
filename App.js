import * as React from 'react'
import MainContainer from './navigation/MainContainer'
import { LogBox } from "react-native";
import {dataLoad} from './database/DataLoad'
import { dataDelete } from './database/DataDelete';

LogBox.ignoreLogs(["EventEmitter.removeListener"])


function App(){

 //  dataDelete();
   dataLoad();

  return(
    <MainContainer/>
  )
}
export default App;