import { Picker } from "@react-native-picker/picker";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { Text } from "react-native-paper";

import Calender from "../../../components/Calender/Calender";
import MyButton from "../../../components/MyButton/MyButton";
import MyInput from "../../../components/MyInput/MyInput";
import MyPicker from "../../../components/MyPicker/MyPicker";
import {
  ChavePixDatabase,
  useChavePixDatabse,
} from "../../../database/useChavesPixDatabase";
import {
  ClientDatabase,
  useClientsDatabase,
} from "../../../database/useClientsDatabase";
import {
  ComprasDatabase,
  useOrderDatabase,
} from "../../../database/useOrderDatabase";

function NewOrderScreen() {
  const databaseClientes = useClientsDatabase();
  const databaseChavePix = useChavePixDatabse();
  const DB = useOrderDatabase();

  const [clientes, setClientes] = useState<ClientDatabase[]>([]);
  const [chavesPix, setChavesPix] = useState<ChavePixDatabase[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedChavePix, setSelectedChavePix] = useState<string>("");
  const [pixAgendado, setPixAgendado] = useState<boolean>(false);
  const [valorVenda, setValorVenda] = useState("");
  const [dataAgendamentoPix, setDataAgendamentoPix] = useState<string>("");
  const [descricaoCompra, setDescricaoCompra] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      async function buscarClientes() {
        const response = await databaseClientes.getAll();
        setClientes(response);
      }

      async function buscarChavePix() {
        const response = await databaseChavePix.getAll();
        setChavesPix(response);
      }

      buscarChavePix();
      buscarClientes();
    }, [databaseClientes, databaseChavePix]),
  );

  const listaDeClientes = clientes.map((cliente) => ({
    label: cliente.nome,
    value: String(cliente.id),
  }));

  const listaChavexPix = chavesPix.map((chavePix) => ({
    label: `${chavePix.nome_recebedor} - ${chavePix.chave_pix}`,
    value: String(chavePix.id),
  }));

  function validateVenda(data: ComprasDatabase): boolean {
    if (!data.idCliente) {
      Alert.alert("Erro", "Selecione um cliente para a venda.");
      return false;
    }

    if (!data.idChavePix) {
      Alert.alert("Erro", "Selecione uma chave Pix para a venda.");
      return false;
    }

    if (data.valor <= 0.1 || data.valor > 1000) {
      Alert.alert(
        "Erro",
        "O valor da venda deve ser maior que 0.1 e menor ou igual a 1000.",
      );
      return false;
    }

    return true;
  }

  async function salvarVenda() {
    const dataVenda: ComprasDatabase = {
      valor: Number(valorVenda),
      idChavePix: Number(selectedChavePix),
      idCliente: Number(selectedCliente),
      agendado: Number(pixAgendado),
      dataAgendamento: dataAgendamentoPix,
      descricao: descricaoCompra,
      status: 1,
    };

    if (!validateVenda(dataVenda)) return;

    try {
      await DB.create(dataVenda);
      Alert.alert("Venda Cadastrada Com Sucesso");
      router.push("/tabs/orders");
    } catch (error) {
      console.error(error);
      Alert.alert("Não Foi possível Salvar Venda");
    }
  }

  return (
    <View>
      <Text>Cadastrar Nova Venda</Text>
      <View>
        <Text>Selecionar Cliente</Text>
        <MyPicker
          label="Selecione um cliente"
          value={selectedCliente}
          onValueChange={setSelectedCliente}
          items={listaDeClientes}
        />
      </View>
      <View>
        <Text>Selecionar Chave Pix</Text>
        <MyPicker
          label="Selecione a chave pix"
          value={selectedChavePix}
          onValueChange={setSelectedChavePix}
          items={listaChavexPix}
        />
      </View>
      <View>
        <MyInput
          label="Descricao Compra"
          placeholder="ex: 3 espetinhos"
          keyboardType="default"
          value={descricaoCompra}
          onChangeText={setDescricaoCompra}
        />
      </View>
      <View>
        <MyInput
          label="Valor Venda"
          placeholder="100,0"
          keyboardType="numeric"
          value={valorVenda}
          onChangeText={setValorVenda}
        />
      </View>
      <View>
        <Text>Esse pix é agendado?</Text>
        <Picker
          selectedValue={pixAgendado ? "true" : "false"}
          onValueChange={(itemValue) => setPixAgendado(itemValue === "true")}
        >
          <Picker.Item label="Não" value="false" />
          <Picker.Item label="Sim" value="true" />
        </Picker>
      </View>
      <View>
        <Calender
          onChangeData={setDataAgendamentoPix}
          dataAgendamento={dataAgendamentoPix}
        />
      </View>
      <View>
        <MyButton title="Salvar Venda" icon="send" action={salvarVenda} />
      </View>
    </View>
  );
}

export default NewOrderScreen;
