import { db } from "../DatabaseOpen";

export function equipmentsDataLoad()
{
    const equipmentData = require('../data/equipmentWrite.json')

    db.transaction(function(tx)
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Equipments(id   INTEGER  PRIMARY KEY,name VARCHAR(26))')

        equipmentData.forEach(element => {

            tx.executeSql('INSERT INTO Equipments(id,name) VALUES (?,?)', [element.id, element.name]);
          }
        )
    },
    function (error) {
      console.log("Transaction ERROR Equipments data load: " + error.message);
    },
    function () {
      console.log("Populated database (Equipments data) OK");
    }
  );
}