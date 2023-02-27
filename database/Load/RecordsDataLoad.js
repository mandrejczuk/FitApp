import { db } from "../DatabaseOpen";

export function recordsDataLoad()
{
    db.transaction(function(tx)
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Records('
            + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
            + 'date TEXT,'
            + 'value REAL,'
            + 'exerciseDone_id INTEGER,'
            + 'FOREIGN KEY(exerciseDone_id) REFERENCES ExercisesDone(id)'
            + ')')

           

    }, function(error) {
        console.log('Transaction ERROR  Records data load: ' + error.message);
      }, function() {
        console.log('Populated database (Records) OK');
      });
}