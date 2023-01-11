import { db } from "../DatabaseOpen";

export function deleteExerciseDoneById(id)
{


    db.transaction(function(tx)
    {
        console.log(id)
       
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