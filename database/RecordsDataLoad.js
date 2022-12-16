import { db } from "./DatabaseOpen";

export function recordsDataLoad()
{
    db.transaction(function(tx)
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Records('
            + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
            + 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,'
            + 'exerciseDone_id INTEGER,'
            + 'FOREIGN KEY(exerciseDone_id) REFERENCES ExercisesDone(id)'
            + ')')

            tx.executeSql('INSERT INTO RECORDS(exerciseDone_id) VALUES (?)',
            [1])

    }, function(error) {
        console.log('Transaction ERROR  Records data load: ' + error.message);
      }, function() {
        console.log('Populated database (Records) OK');
      });
}