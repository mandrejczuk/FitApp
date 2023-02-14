import { db } from "../DatabaseOpen";


export function notesDataLoad()
{
    db.transaction(
        function(tx)
        {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Notes'
            +'( '
            +'id INTEGER PRIMARY KEY , '
            +'date TEXT, '
            +'content TEXT '
            +')'
            )
        }
        ,  function (error) {
      console.log("Transaction ERROR Notes data load : " + error.message);
    },
    function () {
      console.log("Populated database (Notes) OK");
    }
    )
}