import { useSQLiteContext } from "expo-sqlite";

export interface ChavePixDatabase {
  id?: number;
  chave_pix: string;
  nome_recebedor: string;
  cidade_recebedor?: string;
}

export function useChavePixDatabse() {
  const db = useSQLiteContext();

  async function create(data: Omit<ChavePixDatabase, "id">) {
    const statement = await db.prepareAsync(
      "INSERT INTO chaves_pix(chave_pix,nome_recebedor,cidade_recebedor) VALUES ($chave_pix,$nome_recebedor,$cidade_recebedor)",
    );

    try {
      await statement.executeAsync({
        $chave_pix: data.chave_pix,
        $nome_recebedor: data.nome_recebedor,
        $cidade_recebedor: data.cidade_recebedor ?? "GUARAPUAVA",
      });

      await statement.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  async function getAll() {
    try {
      const QUERY = "SELECT * FROM chaves_pix";

      const response = await db.getAllAsync<ChavePixDatabase>(QUERY);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: ChavePixDatabase) {
    if (!data.id) throw new Error("ID é necessario para atualizar");

    const statement = await db.prepareAsync(
      "UPDATE chaves_pix SET chave_pix = $chave_pix,nome_recebedor = $nome_recebedor, cidade_recebedor = $cidade_recebedor WHERE id = $id",
    );

    try {
      await statement.executeAsync({
        $id: Number(data.id),
        $nome_recebedor: data.nome_recebedor,
        $chave_pix: data.chave_pix,
        $cidade_recebedor: data.cidade_recebedor ?? "GUARAPUAVA",
      });

      await statement.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  async function remove(data: ChavePixDatabase) {
    const statement = await db.prepareAsync(
      "DELETE FROM chaves_pix WHERE id = $id",
    );

    try {
      await statement.executeAsync({
        $id: Number(data.id),
      });

      await statement.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  async function searchByChavePix(chavePix: string) {
    const query = "SELECT * FROM chaves_pix WHERE chave_pix LIKE ?";

    try {
      const response = await db.getAllAsync<ChavePixDatabase>(
        query,
        `%${chavePix}%`,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getByID(id: number) {
    const query = "SELECT * FROM chaves_pix WHERE id = ?";

    try {
      const response = await db.getFirstAsync<ChavePixDatabase>(query, id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, getAll, update, remove, searchByChavePix, getByID };
}
