import { db } from "../DatabaseOpen";



export function getDatesRng()
{

    var data = []
    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT Distinct date FROM ExercisesDone ',
        [],function(_,res)
        {
           

            for(let i = 0 ; i < res.rows.length ; i++)
            {
                data.push(res.rows.item(i))
            }
            

        })
    }, function(error){
        console.log('Transaction GET DATES EXERCISES DONE (homescreen) DATA ERROR: ' + error.message);
    }, function() {
      console.log('Populated database (GET DATES EXERCISESDONE) OK');
   
      
    });

    console.log(data)
    return data;
}