import { db } from "../DatabaseOpen";


export function updateDoneExerciseDone(id,done)
{


    db.transaction(function(tx)
    {
        tx.executeSql('UPDATE ExercisesDone SET done = ? WHERE id = ?',[done,id])
    },
    function (error) {
      console.log("Transaction ERROR UPDATEEXERCISESDONE data load : " + error.message);
    },
    function () {
      console.log("Populated database (ExercisesDoneUPDATE) OK");
    }
  );
}