import * as React from 'react'
import MainContainer from './navigation/MainContainer'
import { LogBox } from "react-native";
import {dataLoad} from './database/Load/DataLoad'
import { dataDelete } from './database/Delete/DataDelete';
import { db } from './database/DatabaseOpen';
LogBox.ignoreLogs(["EventEmitter.removeListener"])


function App(){

   //dataDelete();
  // db.readTransaction(function(tx)
  // {
  //     tx.executeSql('SELECT count(*) as licz  FROM sqlite_master WHERE type = ? AND name != ? AND name != ? AND name != ? ',['table','__WebKitDatabaseInfoTable__','sqlite_sequence','android_metadata'],function(tx,res){

          
  
  //        let x = res.rows.item(0).licz
  //        console.log(x)
      
         
  //     })
  //     tx.executeSql('SELECT name  FROM sqlite_master WHERE type = ? AND name != ? AND name != ? AND name != ? ',['table','__WebKitDatabaseInfoTable__','sqlite_sequence','android_metadata'],function(tx,res){

          
  
  //       for(let i = 0 ; i<res.rows.length; i++)
  //       {
  //         console.log(res.rows.item(i).name)
  //       }
     
        
  //    })
  //   })
     dataLoad()

  return(
    <MainContainer/>
  )
}
export default App;