import React, { use, useEffect } from "react";
import { Alert, View } from "react-native";

import MyButton from "../../components/MyButton/MyButton";
import MyInput from "../../components/MyInput/MyInput";
import { ChavePixDatabase, useChavePixDatabse } from "../../database/useChavesPixDatabase";
import { useRouter } from "expo-router";

function NewPixScreen() {
  const DB = useChavePixDatabse();
  const router = useRouter();

  const [nomeRecebor, setNomeRecebor] = React.useState("");
  const [chavePix, setChavePix] = React.useState("");
  const [cidadeRecebedor, setCidadeRecebedor] = React.useState("");
  async function create(data: ChavePixDatabase) {
    try {
      await DB.create(data);
      Alert.alert("Chave Cadastrada Com Sucesso");
      router.push("chaves_pix/Index");
    } catch (error) {
      console.log(error);
    }
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
