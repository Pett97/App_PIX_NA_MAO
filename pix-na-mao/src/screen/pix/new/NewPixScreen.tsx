import { useRouter } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";

import MyButton from "../../../components/MyButton/MyButton";
import MyInput from "../../../components/MyInput/MyInput";
import {
  ChavePixDatabase,
  useChavePixDatabse,
} from "../../../database/useChavesPixDatabase";

function NewPixScreen() {
  const DB = useChavePixDatabse();
  const router = useRouter();

  const [nomeRecebor, setNomeRecebor] = React.useState("");
  const [chavePix, setChavePix] = React.useState("");
  const [cidadeRecebedor, setCidadeRecebedor] = React.useState("");
  async function create(data: ChavePixDatabase) {
    if (!validate(data)) return;
    try {
      await DB.create(data);
      Alert.alert("Chave Cadastrada Com Sucesso");
      router.push("chaves_pix/Index");
    } catch (error) {
      console.log(error);
    }
  }

  function validate(data: ChavePixDatabase): boolean {
    if (!data.chave_pix) {
      Alert.alert("Chave não pode ser cadastrada vazia");
      return false;
    }

    if (!data.nome_recebedor || data.nome_recebedor.length < 3) {
      Alert.alert(
        "Nome Recebedor não pode ser vazio ou ter menos que 3 letras",
      );
      return false;
    }

    return true;
  }

  return (
    <View>
      <MyInput
        label="Chave"
        placeholder="0102700900"
        value={chavePix}
        onChangeText={setChavePix}
      ></MyInput>
      <MyInput
        label="Nome Recebedor"
        placeholder="Fulano"
        value={nomeRecebor}
        onChangeText={setNomeRecebor}
      ></MyInput>
      <MyInput
        label="Cidade Recebedor"
        placeholder="Guarapauva"
        value={cidadeRecebedor}
        onChangeText={setCidadeRecebedor}
      ></MyInput>
      <MyButton
        title="Salvar"
        icon="send"
        action={() => {
          const client = {
            nome_recebedor: nomeRecebor,
            cidade_recebdor: cidadeRecebedor,
            chave_pix: chavePix,
          };
          create(client);
        }}
      ></MyButton>
    </View>
  );
}

export default NewPixScreen;
