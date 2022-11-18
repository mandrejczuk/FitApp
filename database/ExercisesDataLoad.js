import { db } from "./DatabaseOpen";

export function exercisesDataLoad(){

    const exercisesData = require('./data/exercisesWrite.json')

    db.transaction(function(tx){

        tx.executeSql('CREATE TABLE IF NOT EXISTS Exercises('
            + 'id   INTEGER  PRIMARY KEY,'
            + 'name VARCHAR,'
            + 'description VARCHAR,'
            + 'exerciseBase_id INTEGER,'
            + 'FOREIGN KEY (exerciseBase_id) REFERENCES ExercisesBase (id)'
            + ')'
            )
    
            exercisesData.forEach(element =>{
                tx.executeSql('INSERT INTO Exercises (id,name,description,exerciseBase_id)'
                              + 'VALUES (?,?,?,?)', [element.id, element.name, element.description, element.exerciseBase_id])
            })

    },
    function (error) {
      console.log("Transaction ERROR Exercises data load : " + error.message);
    },
    function () {
      console.log("Populated database (Exercises) OK");
    }
  );
}