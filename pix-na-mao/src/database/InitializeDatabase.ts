import { SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabse(database: SQLiteDatabase) {
  try {
    console.log("CRIANDO AS TABELAS");

    // Tabela clientes
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        contato TEXT,
        devedor INTEGER NOT NULL DEFAULT 0
      )
    `);

    // Inserir dados de exemplo em clientes
    await database.execAsync(`
      INSERT OR IGNORE INTO clientes (id, nome, contato, devedor)
      VALUES
        (1, 'João Silva', '99999-9999', 0),
        (2, 'Maria Oliveira', '98888-8888', 1)
    `);

    // Tabela chaves_pix
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS chaves_pix (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chave_pix TEXT NOT NULL UNIQUE,
        nome_recebedor TEXT NOT NULL,
        cidade_recebedor TEXT DEFAULT "GUARAPUAVA"
      )
    `);

    // Inserir dados de exemplo em chaves_pix
    await database.execAsync(`
      INSERT OR IGNORE INTO chaves_pix (id, chave_pix, nome_recebedor, cidade_recebedor)
      VALUES
        (1, 'joao@pix.com', 'João Silva', 'GUARAPUAVA'),
        (2, 'maria@pix.com', 'Maria Oliveira', 'GUARAPUAVA')
    `);

    // Tabela compras
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS compras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        valor DECIMAL(10, 2) NOT NULL,
        id_chave_pix INTEGER NOT NULL,
        id_cliente INTEGER NOT NULL,
        agendado INTEGER NOT NULL,
        data_agendamento DATE,
        status INTEGER DEFAULT 0,
        descricao TEXT,
        FOREIGN KEY (id_chave_pix) REFERENCES chaves_pix(id),
        FOREIGN KEY (id_cliente) REFERENCES clientes(id)
      )
    `);

    // Inserir compras exemplo
    await database.execAsync(`
      INSERT OR IGNORE INTO compras (id, valor, id_chave_pix, id_cliente, agendado, data_agendamento, status, descricao)
      VALUES
        (1, 150.75, 1, 1, 1, '2025-06-20', 0, 'Compra de produtos A'),
        (2, 320.00, 2, 2, 0, NULL, 1, 'Compra de produtos B')
    `);

    console.log("Banco inicializado com dados padrão.");

  } catch (error) {
    console.log("Erro ao inicializar o banco:");
    console.error(error);
  }
}
