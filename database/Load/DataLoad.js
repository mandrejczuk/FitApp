import { db } from "../DatabaseOpen";
import { equipmentsDataLoad } from "./EquipmentsDataLoad";
import { exercisesBaseDataLoad } from "./ExercisesBaseDataLoad";
import { categoriesDataLoad } from "./CategoriesDataLoad";
import {exercisesBaseEquipmentsDataLoad} from './ExercisesBaseEquipmentsDataLoad'
import {exercisesDataLoad} from './ExercisesDataLoad'
import {workoutsDataLoad} from './WorkoutsDataLoad'
import { exercises_WorkoutDaysDataLoad } from "./Exercises_WorkoutDaysDataLoad";
import {workoutDaysDataLoad} from './WorkoutDaysDataLoad'
import {exercisesDoneDataLoad} from './ExercisesDoneDataLoad'
import {recordsDataLoad} from './RecordsDataLoad'
import { dataDelete } from "../Delete/DataDelete";


export function dataLoad()
{
    
    

    db.readTransaction(function(tx)
    {
        tx.executeSql('SELECT count(*) as licz  FROM sqlite_master WHERE type = ? AND name != ? AND name != ? AND name != ? ',['table','__WebKitDatabaseInfoTable__','sqlite_sequence','android_metadata'],function(tx,res){

            //dataDelete()

    
           let x = res.rows.item(0).licz
           
        
            if(x == 0)
            {
                equipmentsDataLoad();
                categoriesDataLoad();
                exercisesBaseDataLoad();
                exercisesBaseEquipmentsDataLoad();
                exercisesDataLoad();
                workoutsDataLoad();
                workoutDaysDataLoad();
                exercises_WorkoutDaysDataLoad();
                exercisesDoneDataLoad();
                recordsDataLoad();
        
            }
            //dataDelete()
        })

        // tx.executeSql('SELECT *   FROM sqlite_master WHERE type = ? AND name != ? AND name != ? AND name != ? ',['table','__WebKitDatabaseInfoTable__','sqlite_sequence','android_metadata'],function(tx,res){
        //     var temp =[]
        //     for(let i=0 ; i<res.rows.length;i++)
        //     {
        //         temp.push(res.rows.item(i))
        //     }
        //     console.log(temp)
        // }
        //
        //)

            

    }, function(error){
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('Populated database OK');
    });

   
}