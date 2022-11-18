import * as React from 'react'
import MainContainer from './navigation/MainContainer'
import { LogBox } from "react-native";
import { dataLoad } from './database/dataLoad';

LogBox.ignoreLogs(["EventEmitter.removeListener"])


function App(){

  dataLoad();

  return(
    <MainContainer/>
  )
}
export default App;