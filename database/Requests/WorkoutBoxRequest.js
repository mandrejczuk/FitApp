import { db } from "../DatabaseOpen";
import * as React from 'react'



export default function getExerciseName(exerciseWorkoutDay_id)
{
     const [result,setResult] = React.useState('undefined')
  // let result = 'co'
    React.useEffect(()=>{
      xd()
    },[])

    function xd()
    {
    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT e.name FROM Exercises e LEFT JOIN Exercises_WorkoutDays ewd ON e.id = ewd.exercise_id WHERE ewd.id = ' + exerciseWorkoutDay_id ,[],function(_,res)
        {
            
          // result = res.rows.item(0).name
           setResult(res.rows.item(0).name)
          // console.log(result)
        })
        //  result = 'gc'
        // console.log(result)
    }, function(error){
        console.log('Transaction GET EXERCISENAME (homescreen) DATA ERROR: ' + error.message);
    }, function() {
      console.log('Populated database (GetExercisesNAME) OK');
    });

  }
    return result
}
