import { db } from "../DatabaseOpen";
import * as React from 'react'

export function isThisANewRecord(id,weight)
{
    var bool = []  ;

    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT count(*) as licz FROM Records r '
        +'LEFT JOIN ExercisesDone ed ON r.exerciseDone_id = ed.id '
        +'LEFT JOIN Exercises_WorkoutDays ewd ON ewd.id = ed.exerciseWorkoutDay_id '
        +'WHERE exercise_id = ? and ed.weight > ?',[id,weight],function(_,res)
        {
            console.log(res.rows.item(0).licz)
            if(res.rows.item(0).licz > 0)
            {
                bool.push(false);
            }
            else
            {
              bool.push(true);
            }
        })
    },
    function (error) {
      console.log("Transaction ERROR IS THIS A RECORD : " + error.message);
    },
    function () {
      console.log("Populated database (IS THIS A NEW RECORD) OK");
    })

    console.log(JSON.stringify(bool))
   return bool;
}