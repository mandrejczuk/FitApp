import { db } from "../DatabaseOpen";

export function deleteExerciseDoneById(id)
{


    db.transaction(function(tx)
    {
       
        tx.executeSql('DELETE FROM ExercisesDone WHERE id = "' + id  +'"')
    },
    function (error) {
      console.log("Transaction ERROR data delete: " + error.message);
    },
    function () {
      console.log("Populated database (data delete) OK");
    }
  );
}