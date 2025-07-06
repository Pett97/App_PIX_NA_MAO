import { useSQLiteContext } from "expo-sqlite";

export interface ComprasDatabase {
  id?: number;
  valor: number;
  idChavePix: number;
  idCliente: number;
  agendado: number;
  dataAgendamento?: Date;
  status?: number;
  descricao?: string;
}

export interface ComprasDatabaseFormatada extends ComprasDatabase {
  nomeCliente: string;
  contatoCliente: string;
  devedorCliente: number;
}

export function useOrderDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<ComprasDatabase, "id">) {
    const statement = await database.prepareAsync(
      `INSERT INTO compras (
        valor, id_chave_pix, id_cliente, agendado, data_agendamento, status, descricao
      ) VALUES (
        $valor, $id_chave_pix, $id_cliente, $agendado, $data_agendamento, $status, $descricao
      )`,
    );

    try {
      const result = await statement.executeAsync({
        $valor: data.valor,
        $id_chave_pix: data.idChavePix,
        $id_cliente: data.idCliente,
        $agendado: data.agendado,
        $data_agendamento: data.dataAgendamento,
        $status: data.status ?? 0,
        $descricao: data.descricao,
      } as any);
      await statement.finalizeAsync();
      return { insertedRowId: result.lastInsertRowId };
    } catch (error) {
      throw error;
    }
  }

  async function getAll() {
    try {
      const query = "SELECT * FROM compras";
      const response = await database.getAllAsync<any>(query);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function searchByNome(nome: string) {
    try {
      const query = `
        SELECT compras.*, clientes.nome 
        FROM compras
        JOIN clientes ON compras.id_cliente = clientes.id
        WHERE clientes.nome LIKE ?;
      `;
      const response = await database.getAllAsync<
        ComprasDatabase & { nome: string }
      >(query, [`%${nome}%`]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getCompraById(
    idCompra: number,
  ): Promise<ComprasDatabaseFormatada | null> {
    const query = `
      SELECT 
          compras.id,
          compras.valor,
          compras.id_chave_pix AS idChavePix,
          compras.id_cliente AS idCliente,
          compras.agendado,
          compras.data_agendamento AS dataAgendamento,
          compras.status,
          compras.descricao,
          clientes.nome AS nomeCliente,
          clientes.contato AS contatoCliente,
          clientes.devedor AS devedorCliente
      FROM compras
      JOIN clientes ON compras.id_cliente = clientes.id
      WHERE compras.id = ?;
   `;
    try {
      const response = await database.getFirstAsync<ComprasDatabaseFormatada>(
        query,
        [idCompra],
      );
      return response;
    } catch (error) {
      console.error("Erro ao buscar compra por ID:", error);
      return null;
    }
  }
  async function update(data: ComprasDatabase) {
    const statement = await database.prepareAsync(
      `UPDATE compras SET
         valor = $valor,
         id_chave_pix = $id_chave_pix,
         id_cliente = $id_cliente,
         agendado = $agendado,
         data_agendamento = $data_agendamento,
         status = $status,
         descricao = $descricao
       WHERE id = $id`,
    );

    try {
      const result = await statement.executeAsync({
        $id: Number(data.id),
        $valor: data.valor,
        $id_chave_pix: data.idChavePix,
        $id_cliente: data.idCliente,
        $agendado: data.agendado,
        $data_agendamento: data.dataAgendamento ?? null,
        $status: data.status ?? 0,
        $descricao: data.descricao ?? null,
      } as any);
      await statement.finalizeAsync();
      return result; // Retorna result pra saber quantas linhas foram afetadas
    } catch (error) {
      console.error("Erro no update:", error);
      throw error;
    }
  }

  async function remove(data: ComprasDatabase) {
    const statement = await database.prepareAsync(
      "DELETE FROM compras WHERE id = $id",
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
  async function getVendasFormatadas(): Promise<ComprasDatabaseFormatada[]> {
    try {
      const query = `
            SELECT 
            compras.id,
            compras.valor,
            compras.id_chave_pix AS idChavePix,
            compras.id_cliente AS idCliente,
            compras.agendado,
            compras.data_agendamento AS dataAgendamento,
            compras.status,
            compras.descricao,
            clientes.nome AS nomeCliente,
            clientes.contato AS contatoCliente,
            clientes.devedor AS devedorCliente
            FROM compras
            JOIN clientes ON compras.id_cliente = clientes.id
    `;

      const result =
        await database.getAllAsync<ComprasDatabaseFormatada>(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    update,
    remove,
    searchByNome,
    getVendasFormatadas,
    getCompraById,
    getAll,
  };
}
