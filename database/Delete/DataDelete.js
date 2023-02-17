import { db } from "../DatabaseOpen";

export function dataDelete()
{
    db.transaction(function(tx)
    {
        
       
        tx.executeSql('DROP TABLE IF EXISTS Equipments')
        tx.executeSql('DROP TABLE IF EXISTS Categories')
        tx.executeSql('DROP TABLE IF EXISTS ExercisesBase')
        tx.executeSql('DROP TABLE IF EXISTS ExercisesBase_Equipments')
        tx.executeSql('DROP TABLE IF EXISTS Exercises')
        tx.executeSql('DROP TABLE IF EXISTS Workouts')
        tx.executeSql('DROP TABLE IF EXISTS WorkoutDays')
        tx.executeSql('DROP TABLE IF EXISTS Exercises_WorkoutDays')
        tx.executeSql('DROP TABLE IF EXISTS ExercisesDone')
        tx.executeSql('DROP TABLE IF EXISTS Records')
        tx.executeSql('DROP TABLE IF EXISTS Notes')
    },
    function (error) {
      console.log("Transaction ERROR data delete: " + error.message);
    },
    function () {
      console.log("Populated database (data delete) OK");
    }
  );
}