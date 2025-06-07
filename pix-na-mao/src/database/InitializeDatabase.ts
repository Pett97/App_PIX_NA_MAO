import { SQLiteDatabase } from 'expo-sqlite';


export async function initializeDatabse(database: SQLiteDatabase) {
      try {
            console.log("CRIANDO AS TABELAS");
            //tabela clientes  
            await database.execAsync(`
         CREATE TABLE IF NOT EXISTS clientes (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         nome TEXT NOT NULL,
         contato TEXT,
         devedor INTEGER NOT NULL DEFAULT 0
          ) 
      `);

            //tabela chaves_pix
            await database.execAsync(`
          CREATE TABLE IF NOT EXISTS chaves_pix(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chave_pix TEXT NOT NULL UNIQUE,
          nome_recebedor TEXT NOT NULL,
          cidade_recebedor TEXT DEFAULT "GUARAPUAVA"
         )
      `)
      } catch (error) {
            console.log("deu ruim");
            console.error(error);
      }
};