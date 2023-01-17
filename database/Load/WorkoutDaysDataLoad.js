import { db } from "../DatabaseOpen";

export function workoutDaysDataLoad() {
  db.transaction(
    function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS WorkoutDays(" +
          "id   INTEGER  PRIMARY KEY AUTOINCREMENT," +
          "type VARCHAR," +
          "workout_id INTEGER," +
          "FOREIGN KEY (workout_id) REFERENCES Workouts (id)" +
          ")"
      );
      tx.executeSql(
        "INSERT INTO WorkoutDays(type,workout_id)" + "VALUES (?,?)",
        ["CUSTOM", 1]
      );

      tx.executeSql(
        "INSERT INTO WorkoutDays(type,workout_id)" + "VALUES (?,?)",
        ["A", 2]
      );
      tx.executeSql(
        "INSERT INTO WorkoutDays(type,workout_id)" + "VALUES (?,?)",
        ["B", 2]
      );
      tx.executeSql(
        "INSERT INTO WorkoutDays(type,workout_id)" + "VALUES (?,?)",
        ["C", 2]
      );
    },
    function (error) {
      console.log("Transaction ERROR WorkoutDays data load: " + error.message);
    },
    function () {
      console.log("Populated database (WorkoutDays) OK");
    }
  );
}
