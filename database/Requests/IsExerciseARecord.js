import { db } from "../DatabaseOpen";
import * as React from 'react'


export function isExerciseARecord(exerciseDone_id)
{
var bool = true;

const callback = (res) =>
{
  bool = res
  console.log(bool)
}
dbIsExerciseARecord(exerciseDone_id,callback)


return bool
 
}


function IsExerciseARecord(exerciseDone_id)
{


    

    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT COUNT(*) as licz FROM Records '
        +'WHERE exerciseDone_id = ? ',[exerciseDone_id],function(_,res)
        {
          console.log(res.rows.item(0).licz)
            if(res.rows.item(0).licz > 0)
            {
             //
            }
            else
            {
             //
            }
        })

    },
    function (error) {
      console.log("Transaction ERROR IS EXERCISE A RECORD : " + error.message);
    },
    function () {
      console.log("Populated database (IS EXERCISE A RECORD) OK");
    })

  
}