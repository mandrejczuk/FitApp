import { db } from "./DatabaseOpen";

export function exercisesBaseEquipmentsDataLoad()
{
    const exercisesBaseEquipmentData =  require('./data/exerciseBaseWrite.json')

    db.transaction(
        function (tx) {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS ExercisesBase_Equipments(" +
              "id   INTEGER  PRIMARY KEY AUTOINCREMENT," +
              "exerciseBase_id INTEGER," +
              "equipment_id INTEGER," +
              "FOREIGN KEY (equipment_id) REFERENCES Equipments (id)," +
              "FOREIGN KEY (exerciseBase_id) REFERENCES ExerciseBase (id)" +
              ")"
          );


          exercisesBaseEquipmentData.forEach((element) => {
            if(element.equipment_id.length != 0)
            {
                element.equipment_id.forEach (eq => {
    
                    tx.executeSql(
                      "INSERT INTO ExercisesBase_Equipments(exerciseBase_id,equipment_id)" +
                        "VALUES(?,?)", [element.id,eq]
                    );
                  }) 
            }
            else{
                tx.executeSql(
                    "INSERT INTO ExercisesBase_Equipments(exerciseBase_id,equipment_id)" +
                      "VALUES(?,?)", [element.id,element.equipment_id]
                  );
            }
          });


        },
        function (error) {
          console.log("Transaction ExercisesBase_Equipments ERROR: " + error.message);
        },
        function () {
          console.log("Populated database (ExerciseBase_Equipments) OK");
        }
      );
}