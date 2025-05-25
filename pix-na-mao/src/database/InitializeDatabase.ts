
import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabse(database: SQLiteDatabase) {
   await database.execAsync(`
         CREATE TABLE IF NOT EXISTS clientes (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         nome TEXT NOT NULL,
         contato TEXT,
         devedor INTEGER NOT NULL DEFAULT 0
          ) 
      `);
};