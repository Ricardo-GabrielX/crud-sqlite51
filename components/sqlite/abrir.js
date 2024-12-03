import * as SQLite from 'expo-sqlite';

async function abrir(){
  dbAsync = await SQLite.openDatabaseAsync('pam.db3');
  console.log("Arquivo DB3 criado");
  return dbAsync;

}

export default abrir;