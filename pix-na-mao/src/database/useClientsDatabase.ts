import { useSQLiteContext } from "expo-sqlite";

export interface ClientDatabase {
  id?: number;
  nome: string;
  contato: string;
  devedor: number; // 0 = false, 1 = true é pra funcionar teoricament
}

export function useClientsDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ClientDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO clientes (nome, contato ,devedor) VALUES ($nome,$contato,$devedor)",
    );
    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
        $contato: data.contato,
        $devedor: data.devedor,
      });
      await statement.finalizeAsync();

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    }
  }

  async function getAll() {
    try {
      const query = "SELECT * FROM clientes";

      const response = await database.getAllAsync<ClientDatabase>(query);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function searchByNome(nome: string) {
    try {
      const query = "SELECT * FROM clientes WHERE nome LIKE ?";
      const response = await database.getAllAsync<ClientDatabase>(
        query,
        `%${nome}%`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: ClientDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE clientes SET nome = $nome, devedor = $devedor,contato = $contato WHERE id = $id",
    );
    try {
      await statement.executeAsync({
        $id: Number(data.id),
        $contato: data.contato,
        $nome: data.nome,
        $devedor: data.devedor,
      });
      await statement.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  async function remove(data: ClientDatabase) {
    const statement = await database.prepareAsync(
      "DELETE FROM clientes WHERE id = $id",
    );
    try {
      const result = await statement.executeAsync({
        $id: Number(data.id),
      });
      await statement.finalizeAsync();

      return { changes: result.changes };
    } catch (error) {
      throw error;
    }
  }

  return { create, update, remove, searchByNome, getAll };
}
