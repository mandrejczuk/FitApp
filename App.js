import * as React from 'react'
import MainContainer from './navigation/MainContainer'
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"])


function App(){
  return(
    <MainContainer/>
  )
}
export default App;