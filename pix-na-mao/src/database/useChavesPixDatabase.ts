import { useSQLiteContext } from "expo-sqlite";

export interface ChavePixDatabase {
   id?: number;
   chave_pix: string;
   nome_recebedor: string;
   cidade_recebedor?: string;
};

export function useChavePixDatabse() {
   const db = useSQLiteContext();

   async function create(data: Omit<ChavePixDatabase, "id">) {
      const statement = await db.prepareAsync(
         "INSERT INTO chaves_pix(chave_pix,nome_recebedor,cidade_recebedor) VALUES ($chave_pix,$nome_recebedor,$cidade_recebedor)"
      );

      try {
         const result = await statement.executeAsync({
            $chave_pix: data.chave_pix,
            $nome_recebedor: data.nome_recebedor,
            $cidade_recebedor: data.cidade_recebedor ?? "GUARAPUAVA"
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
   };

   async function update(data:ChavePixDatabase) {
      const statement  = await db.prepareAsync("UPDATE chaves_pix SET chave_pix = $")      
   }

   return { create,getAll }
}
