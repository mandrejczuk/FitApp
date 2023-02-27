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
      //GVT A
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
      //GVT B
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
      //GVT C
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
    //STRONGLIFTS A
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [5, 5, 5, 111,75]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [5, 5, 5, 192,75]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [5, 5, 5, 109,75]
    );
    //STRONGLIFTS B
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [5, 5, 6, 111,75]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [5, 5, 6, 1069,75]
    );
    tx.executeSql(
      "INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id,orm)" +
        "VALUES (?,?,?,?,?)",
      [5, 5, 6, 109,105]
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
