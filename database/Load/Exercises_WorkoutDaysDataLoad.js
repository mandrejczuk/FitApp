import { db } from "../DatabaseOpen";

export function exercises_WorkoutDaysDataLoad() {
  db.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Exercises_WorkoutDays(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "sets INTEGER," +
        "repetitions INTEGER," +
        "workoutDay_id INTEGER," +
        "exercise_id INTEGER," +
        "FOREIGN KEY (workoutDay_id) REFERENCES WorkoutDays (id)" +
        "FOREIGN KEY (exercise_id) REFERENCES Exercises(id)" +
        ")"
    );

    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [8, 8, 1, 111]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [8, 8, 1, 192]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [4, 8, 1, 340]
    );

    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [8, 8, 2, 105]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [8, 8, 2, 1069]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [4, 8, 2, 81]
    );

    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [8, 8, 3, 191]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [8, 8, 3, 97]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id)" +
        "VALUES (?,?,?,?)",
      [4, 8, 3, 148]
    );
  },
  function (error) {
    console.log("Transaction ERROR Exercises_WorkoutDays data load: " + error.message);
  },
  function () {
    console.log("Populated database (Exercises_WorkoutDays) OK");
  }
);
}
