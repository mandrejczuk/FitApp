import * as SQLite from 'expo-sqlite';


export  const db = SQLite.openDatabase('FitAppData.db', '1.0', '', 1)