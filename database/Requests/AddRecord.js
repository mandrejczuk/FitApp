import { db } from "../DatabaseOpen";

export function addRecord(exerciseDone_id,weight)
{
    db.transaction(function(tx)
    {
      
            tx.executeSql('INSERT INTO RECORDS(exerciseDone_id,value) VALUES (?,?)',
            [exerciseDone_id,weight])

    }, function(error) {
        console.log('Transaction ERROR  addRecord: ' + error.message);
      }, function() {
        console.log('Populated database (addRecord) OK');
      });
}