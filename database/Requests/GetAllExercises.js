import { db } from "../DatabaseOpen";




export  function getAllExercises()
{
    var data = [];

    db.readTransaction(function(tx)
    {
       
        tx.executeSql('SELECT * FROM Exercises',[],function(_,res)
        {
            for(let i = 0; i < res.rows.length ; i++)
            {
                data.push(res.rows.item(i))
            }
        })
    },
    function (error) {
      console.log("Transaction ERROR data delete: " + error.message);
    },
    function () {
      console.log("Populated database (data delete) OK");
    }
  );

  return data;
}

export function getExerciesByNameCategoryEquipment(name,category,equipment)
{
  
  var data = [];

  db.readTransaction(function(tx)
  {
     
    tx.executeSql('SELECT Distinct e.* FROM Exercises e '
    + 'LEFT JOIN ExercisesBase eb ON e.exerciseBase_id = eb.id ' 
    + 'LEFT JOIN Categories C  ON eb.category_id = c.id '
    + 'LEFT JOIN ExercisesBase_Equipments eeb ON eb.id = eeb.exerciseBase_id ' 
    + 'LEFT JOIN Equipments eq ON eeb.equipment_id = eq.id  '
    + 'WHERE '
    + 'equipment_id IN '+ equipment
    + ' AND '
    + 'category_id IN ' + category
    + ' AND '
    + 'e.name LIKE ' + '"%' + name + '%"'  
    ,[],function(_,res)
      {
          for(let i = 0; i < res.rows.length ; i++)
          {
              data.push(res.rows.item(i))
          }
      })
  },
  function (error) {
    console.log("Transaction ERROR data delete: " + error.message);
  },
  function () {
    console.log("Populated database (data delete) OK");
  }
);
console.log(JSON.stringify(data))
return data;
}