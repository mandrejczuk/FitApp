import { db } from "../DatabaseOpen";




export function addCustomExerciseToPlan(sets,reps,exercise_id,weight,date)
{
    db.transaction(function(tx)
    {

      tx.executeSql('SELECT count(*) as licz ' 
      +'FROM  Exercises_WorkoutDays ' 
      +'WHERE exercise_id = '+exercise_id+' '
      +'AND sets = '+sets+' '
      +'AND repetitions = '+reps+' ',[],function(tx,res){
        
        //console.log(res.rows.item(0).licz)
        if(res.rows.item(0).licz >0)
        {
          
          tx.executeSql('SELECT id '
          +'FROM  Exercises_WorkoutDays ' 
          +'WHERE exercise_id = '+exercise_id+' '
          +'AND sets = '+sets+' '
          +'AND repetitions = '+reps+' ',[],function(tx,res){

            let id = res.rows.item(0).id
            
            
            tx.executeSql('INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id) '
                          +'VALUES (?,?,?,?)',
                          [weight,0,date,id])

          })
        }
        else{
          tx.executeSql(
            'INSERT INTO Exercises_WorkoutDays(sets,repetitions,workoutDay_id,exercise_id) '
              +'VALUES (?,?,?,?)',
            [sets, reps,1, exercise_id],function(tx,res)
            {
              console.log(res.insertId)
              var id = res.insertId
              tx.executeSql('INSERT INTO ExercisesDone(weight,done,date,exerciseWorkoutDay_id) '
              +'VALUES (?,?,?,?)',
              [weight,0,date,id])
            }
          );

        }

      })
   
    },
    function (error) {
      console.log("Transaction ERROR Exercises_WorkoutDays data load: " + error.message);
    },
    function () {
      console.log("Populated database (Exercises_WorkoutDays) OK");
    })

}