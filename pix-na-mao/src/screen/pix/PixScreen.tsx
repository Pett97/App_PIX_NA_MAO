import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, FlatList, View } from "react-native";

import Chave from "../../components/Chave/Chave";
import MyButton from "../../components/MyButton/MyButton";
import {
  ChavePixDatabase,
  useChavePixDatabse,
} from "../../database/useChavesPixDatabase";
import { handleDelete } from "../../handle/handleDelete";
import StylePixScreen from "./StylePixScrenn";

export default function PixScreen() {
  const DB = useChavePixDatabse();
  const router = useRouter();
  const [chaves, setChaves] = React.useState<ChavePixDatabase[]>([]);

  const list = useCallback(async () => {
    try {
      const response = await DB.getAll();
      setChaves(response);
    } catch (error) {
      console.log(error);
    }
  }, [DB]);

  //para puxar os dados
  useFocusEffect(
    useCallback(() => {
      list();
    }, [list]),
  );

  const remove = useCallback(
    async (data: ChavePixDatabase) => {
      try {
        await DB.remove(data);
        list();
      } catch (error) {
        console.error(error);
        Alert.alert("Não foi possivel deletar chave pix");
      }
    },
    [DB, list],
  );

  const redirect = useCallback(() => {
    router.push("chaves_pix/NewChave");
  }, [router]);

  return (
    <View style={StylePixScreen.container}>
      <View style={StylePixScreen.btnNewChave}>
        <MyButton
          title="Adicionar Nova Chave Pix"
          icon="plus-circle"
          mode="contained"
          action={redirect}
        />
      </View>
      <View style={{ flex: 1, margin: 15 }}>
        <FlatList
          data={chaves}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Chave
              nome_recebedor={item.nome_recebedor}
              cidade_recebedor={item.cidade_recebedor ?? "GUARAPUAVA"}
              chave_pix={item.chave_pix}
              action={() => {
                router.push(`chaves_pix/${item.id}`);
              }}
              secondAction={() => {
                handleDelete("Cancelar", "Deletar", () => remove(item));
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
