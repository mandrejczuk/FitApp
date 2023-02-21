import { db } from "../DatabaseOpen";
import { formatDate } from "../../components/FormatDate";

export function noteSave(content,date){

    db.transaction(function(tx)
    {
      tx.executeSql('SELECT Count(*) as licz FROM NOTES WHERE date = "'+formatDate(date)+'"',[],function(_,res)
      {
        if(res.rows.item(0).licz >0)
        {
            tx.executeSql('UPDATE NOTES SET content = "'+content+'" WHERE date = "'+formatDate(date)+'"',[],)
        }
        else{
            tx.executeSql('INSERT INTO NOTES(content,date) VALUES (?,?)',
            [content,formatDate(date)])
        }
      }), function(error){
        console.log('Transaction GET NOTE CONTENT (DayDetails) DATA ERROR: ' + error.message);
    }, function() {
      console.log('Populated database (DayDetails) OK');
      
    };
    })
}