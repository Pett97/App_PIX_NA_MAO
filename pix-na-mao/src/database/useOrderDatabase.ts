import { useSQLiteContext } from 'expo-sqlite';

export interface ComprasDatabase {
   id?: number;
   valor: number;
   idChavePix: number;
   idCliente: number;
   agendado: number;
   dataAgendamento?: Date | string;
   status?: number;
   descricao?: string;
}

export function useOrderDatabase() {
   const database = useSQLiteContext();

   async function create(data: Omit<ComprasDatabase, "id">) {
      const statement = await database.prepareAsync(
         `INSERT INTO compras (
        valor, id_chave_pix, id_cliente, agendado, data_agendamento, status, descricao
      ) VALUES (
        $valor, $id_chave_pix, $id_cliente, $agendado, $data_agendamento, $status, $descricao
      )`
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
         return response.map(formatCompra); //xaxo pesquisar 
      } catch (error) {
         throw error;
      }
   }

   function formatCompra(row: any): ComprasDatabase {
      return {
         id: row.id,
         valor: row.valor,
         idChavePix: row.id_chave_pix,
         idCliente: row.id_cliente,
         agendado: row.agendado,
         dataAgendamento: row.data_agendamento ? new Date(row.data_agendamento).toLocaleDateString("pt-br") : undefined,
         status: row.status,
         descricao: row.descricao,
      };
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

   async function getClienteByIdCompra(idCompra: number) {
      try {
         const query = `
      SELECT compras.*, clientes.nome, clientes.contato, clientes.devedor
      FROM compras
      JOIN clientes ON compras.id_cliente = clientes.id
      WHERE compras.id = $idCompra
    `;

         const result = await database.getAllAsync<
            ComprasDatabase & {
               nome: string;
               contato: string;
               devedor: number;
            }
         >(query, { $idCompra: idCompra });

         return result[0];
      } catch (error) {
         console.error("Erro ao buscar compra com cliente:", error);
         throw error;
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
      WHERE id = $id`
      );

      try {
         const result = await statement.executeAsync({
            $id: Number(data.id),
            $valor: data.valor,
            $id_chave_pix: data.idChavePix,
            $id_cliente: data.idCliente,
            $agendado: data.agendado,
            $data_agendamento: data.dataAgendamento,
            $status: data.status ?? 0,
            $descricao: data.descricao,
         } as any);
         await statement.finalizeAsync();
      } catch (error) {
         throw error;
      }
   }

   async function remove(data: ComprasDatabase) {
      const statement = await database.prepareAsync(
         "DELETE FROM compras WHERE id = $id"
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

   return { create, update, remove, searchByNome, getAll, getClienteByIdCompra };
}
