import {db} from '../DatabaseOpen'

export function dataTest()
{
    const equipmentData = require('./equipmentWrite.json')

    equipmentData.forEach(element =>{console.log(element)})

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

  db.readTransaction(function(tx)
{
    tx.executeSql('SELECT * FROM Equipments',[],function(_,res){
        
        var temp = []
        
        for(let i = 0; i < res.rows.length ; i++)
        {
            temp.push(res.rows.item(i).name)
        }
        console.log(temp)
    })
},
function(error){
    console.log(error.message +  'cos sie popsulo')
},
function(){
    console.log('gitens')
}

  )
}