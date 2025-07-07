import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import MyButton from "../../../components/MyButton/MyButton";
import MyInput from "../../../components/MyInput/MyInput";
import {
  ChavePixDatabase,
  useChavePixDatabse,
} from "../../../database/useChavesPixDatabase";

function EditPixScreen() {
  const DB = useChavePixDatabse();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nomeRecebedor, setNomeRecebedor] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [cidadeRecebedor, setCidadeRecebedor] = useState("");

  //puxa do banco
  useEffect(() => {
    let mounted = true;
    async function loadChave() {
      try {
        const pix = await DB.getByID(Number(id));
        if (pix && mounted) {
          setNomeRecebedor(pix.nome_recebedor);
          setChavePix(pix.chave_pix);
          setCidadeRecebedor(pix.cidade_recebedor ?? "");
        }
      } catch (error) {
        console.log("Erro ao carregar chave:", error);
      }
    }

    loadChave();

    return () => {
      mounted = false;
    };
  }, [id, DB]);

  async function update(data: ChavePixDatabase) {
    if (!validate(data)) return;
    try {
      await DB.update(data);
      Alert.alert("Chave atualizada com sucesso");
      router.push("/tabs/chaves_pix/Index");
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
      />
      <MyInput
        label="Nome Recebedor"
        placeholder="Fulano"
        value={nomeRecebedor}
        onChangeText={setNomeRecebedor}
      />
      <MyInput
        label="Cidade Recebedor"
        placeholder="Guarapuava"
        value={cidadeRecebedor}
        onChangeText={setCidadeRecebedor}
      />
      <MyButton
        title="Salvar"
        icon="send"
        action={() =>
          update({
            id: Number(id),
            chave_pix: chavePix,
            nome_recebedor: nomeRecebedor,
            cidade_recebedor: cidadeRecebedor,
          })
        }
      />
    </View>
  );
}

export default EditPixScreen;
