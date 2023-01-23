import { db } from "../DatabaseOpen";

export function deleteRecordByExerciseDone(exerciseDone_id){

    db.transaction(function(tx)
    {
        tx.executeSql('DELETE FROM Records WHERE exerciseDone_id =  '+exerciseDone_id)
    },
    function (error) {
        console.log("Transaction ERROR deleteRecordByExerciseDone : " + error.message);
      },
      function () {
        console.log("Populated database (deleteRecordByExerciseDone) OK");
      })
}
