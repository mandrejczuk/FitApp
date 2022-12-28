import { db } from "../DatabaseOpen";

export function exercisesDoneDataLoad() {
  db.transaction(
    function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS ExercisesDone(" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "weight REAL," +
          "done INTEGER," +
          "date TEXT," +
          "exerciseWorkoutDay_id," +
          "FOREIGN KEY (exerciseWorkoutDay_id) REFERENCES Exercises_WorkoutDays (id)" +
          ")"
      );

      tx.executeSql(
        "INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id)" +
          "VALUES(?,?,date(),?)",
        [34.5,1, 1]
      );
      tx.executeSql(
        "INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id)" +
          "VALUES(?,?,date(),?)",
        [70,1, 2]
      );
      tx.executeSql(
        "INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id)" +
          "VALUES(?,?,date(),?)",
        [5,0, 3]
      );
    },
    function (error) {
      console.log("Transaction ERROR ExercisesDone data load : " + error.message);
    },
    function () {
      console.log("Populated database (ExercisesDone) OK");
    }
  );
}
