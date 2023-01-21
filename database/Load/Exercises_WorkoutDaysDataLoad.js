import { db } from "../DatabaseOpen";

export function exercises_WorkoutDaysDataLoad() {
  db.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Exercises_WorkoutDays(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "sets INTEGER," +
        "repetitions INTEGER," +
        "orm INTEGER,"+
        "workoutDay_id INTEGER," +
        "exercise_id INTEGER," +
        "FOREIGN KEY (workoutDay_id) REFERENCES WorkoutDays (id)" +
        "FOREIGN KEY (exercise_id) REFERENCES Exercises(id)" +
        ")"
    );

    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [8, 8, 2, 111,60]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [8, 8, 2, 192,60]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [4, 8, 2, 340,70]
    );

    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [8, 8, 3, 105,60]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [8, 8, 3, 1069,60]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [4, 8, 3, 81,70]
    );

    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [8, 8, 4, 191,60]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [8, 8, 4, 97,60]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [4, 8, 4, 148,70]
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
