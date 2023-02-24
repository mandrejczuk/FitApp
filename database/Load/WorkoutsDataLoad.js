import { db } from "../DatabaseOpen";

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
        "CUSTOM",
        "EXERCISES ADDED BY USER TO PLAN",
      ]);

      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "German Volume",
        "German Volume Training, or GVT for short, is a high-volume training program that was popularized in the 1970s by German weightlifting coach Rolf Feser. The program is designed to help build muscle mass and increase overall strength by using a combination of heavy lifting and high volume.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "Texas Method",
        "The Texas Method is a popular intermediate-level strength training program that has been around for many years. It is a high-volume, high-intensity program that is designed to help lifters make consistent progress in their strength and muscle mass gains.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "StrongLifts 5x5",
        "StrongLifts 5x5 is a beginner-friendly strength training program that focuses on the main lifts (squat, bench press, and deadlift) and uses a 5x5 rep scheme to help you build strength and muscle mass. The program also includes two additional exercises, the overhead press and the barbell row, to help build overall upper body strength.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "ORM Workout",
        "A sample workout plan based on your ORM.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "Leg Workouts",
        "A sample workout plan based on your ORM.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "Chest Workouts",
        "A sample workout plan based on your ORM.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "5/3/1 Workout",
        "A sample workout plan based on your ORM.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "Push&Pull",
        "A sample workout plan based on your ORM.",
      ]);
      tx.executeSql("INSERT INTO Workouts(name,description)" + "VALUES (?,?)", [
        "Split",
        "A sample workout plan based on your ORM.",
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
