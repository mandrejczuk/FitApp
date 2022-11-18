import { db } from "./DatabaseOpen";

export function categoriesDataLoad() {


    const categoriesData = require('./data/categoriesWrite.json')

  db.transaction(
    function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Categories' 
        +'(id INTEGER PRIMARY KEY ,'
        +'name VARCHAR(15))');

        categoriesData.forEach(element =>{

            tx.executeSql('INSERT INTO Categories(id,name) VALUES(?,?)', [element.id,element.name])
        })

    },
    function (error) {
      console.log("Transaction ERROR Categories data load: " + error.message);
    },
    function () {
      console.log("Populated database (Categories data) OK");
    }
  );
}
