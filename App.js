import * as React from 'react'
import MainContainer from './navigation/MainContainer'
import { LogBox } from "react-native";
import {dataLoad} from './database/Load/DataLoad'
import { dataDelete } from './database/Delete/DataDelete';

LogBox.ignoreLogs(["EventEmitter.removeListener"])


function App(){

 // dataDelete();
   dataLoad();

  return(
    <MainContainer/>
  )
}
export default App;