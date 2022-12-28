import { db } from "../DatabaseOpen";

export function exercisesBaseDataLoad()
{
    const exercisesBaseData = require('../data/exerciseBaseWrite.json')

    db.transaction(
        function (tx) {
            
            tx.executeSql('CREATE TABLE IF NOT EXISTS ExercisesBase('
            + 'id   INTEGER  PRIMARY KEY,'
            + 'category_id INTEGER,'
            + 'FOREIGN KEY (category_id) REFERENCES Categories (id)'
            + ')'
            )
    
            exercisesBaseData.forEach(element =>{
                tx.executeSql('INSERT INTO ExercisesBase (id, category_id)'
                              + 'VALUES (?,?)', [element.id,element.category_id])
            })
    
        },
        function (error) {
          console.log("Transaction ERROR ExercsiesBase data load: " + error.message);
        },
        function () {
          console.log("Populated database (ExercisesBase data) OK");
        }
      );
}