import { db } from "./DatabaseOpen";

export function workoutsDataLoad() {
  db.transaction(
    function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Workouts(" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT," +
          "name VARCHAR," +
          "description VARCHAR)"
      );

      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "German Volume",
        "FOCUSES ON VOLUME TO BUILD STRENGTH APPROVED BY MANY POWELIFTERS",
      ]);
    },
    function (error) {
      console.log("Transaction ERROR Workouts data load: " + error.message);
    },
    function () {
      console.log("Populated database (Workouts) OK");
    }
  );
}
