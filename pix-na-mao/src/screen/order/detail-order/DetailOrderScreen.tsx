import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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
  ComprasDatabaseFormatada,
  useOrderDatabase,
} from "../../../database/useOrderDatabase";
import styleDetailOrder from "./DetailOrderScreenStyle";

function DetailOrderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const databaseClientes = useClientsDatabase();
  const databaseChavePix = useChavePixDatabse();
  const DB = useOrderDatabase();

  const [clientes, setClientes] = useState<ClientDatabase[]>([]);
  const [chavesPix, setChavesPix] = useState<ChavePixDatabase[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedChavePix, setSelectedChavePix] = useState<string>("");
  const [pixAgendado, setPixAgendado] = useState<boolean>(false);
  const [statusPagamento, setStatusPagamento] = useState<number>(0);
  const [valorVenda, setValorVenda] = useState<string>("");
  const [dataAgendamentoPix, setDataAgendamentoPix] = useState<string>("");
  const [descricaoCompra, setDescricaoCompra] = useState<string | undefined>(
    "",
  );

  const buscarClientes = useCallback(async () => {
    try {
      const response = await databaseClientes.getAll();
      setClientes(response);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }, [databaseClientes]);

  const buscarChavePix = useCallback(async () => {
    try {
      const response = await databaseChavePix.getAll();
      setChavesPix(response);
    } catch (error) {
      console.error("Erro ao buscar chaves pix:", error);
    }
  }, [databaseChavePix]);

  const buscarDadosCompra = useCallback(async () => {
    try {
      const compra: ComprasDatabaseFormatada | null = await DB.getCompraById(
        Number(id),
      );
      if (compra) {
        setSelectedCliente(String(compra.idCliente));
        setSelectedChavePix(String(compra.idChavePix));
        setValorVenda(String(compra.valor));
        setPixAgendado(Boolean(compra.agendado));
        setStatusPagamento(compra.status);
        setDescricaoCompra(compra.descricao);
        setDataAgendamentoPix(
          compra.dataAgendamento
            ? new Date(compra.dataAgendamento).toISOString().split("T")[0]
            : "",
        );
      }
    } catch (error) {
      console.error("Erro ao buscar compra:", error);
    }
  }, [DB, id]);
  const loadedRef = React.useRef(false);

  useEffect(() => {
    if (!loadedRef.current) {
      const carregarDados = async () => {
        await buscarClientes();
        await buscarChavePix();
        await buscarDadosCompra();
        loadedRef.current = true;
      };
      carregarDados();
    }
  }, [buscarClientes, buscarChavePix, buscarDadosCompra]);

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

  async function atualizarOrder() {
    const dataVenda: ComprasDatabase = {
      id: Number(id),
      valor: Number(valorVenda),
      idChavePix: Number(selectedChavePix),
      idCliente: Number(selectedCliente),
      agendado: pixAgendado ? 1 : 0,
      dataAgendamento: dataAgendamentoPix || null,
      status: statusPagamento,
      descricao: descricaoCompra,
    };

    if (!validateVenda(dataVenda)) return;

    try {
      await DB.update(dataVenda);
      router.push("/tabs/orders");
      Alert.alert("Venda atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      Alert.alert("Não foi possível atualizar a venda");
    }
  }

  return (
    <View>
      <View>
        <Text>Atualizar Cliente</Text>
        <MyPicker
          label="Selecione um cliente"
          value={selectedCliente}
          onValueChange={setSelectedCliente}
          items={listaDeClientes}
        />
      </View>
      <View>
        <Text>Atualizar Chave Pix</Text>
        <MyPicker
          label="Selecione a chave pix "
          value={selectedChavePix}
          onValueChange={setSelectedChavePix}
          items={listaChavexPix}
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
        <MyInput
          label="Descricao Compra"
          placeholder="ex: 3 espetinhos"
          keyboardType="default"
          value={descricaoCompra}
          onChangeText={setDescricaoCompra}
        ></MyInput>
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
        <Text>Selecionar o Status desse Pagamento</Text>
        <Picker
          selectedValue={String(statusPagamento)}
          onValueChange={(itemValue) => setStatusPagamento(Number(itemValue))}
        >
          <Picker.Item label="ABERTO" value="0" />
          <Picker.Item label="PAGO" value="1" />
        </Picker>
      </View>
      <View>
        <MyButton
          title="Mostrar QRCODE"
          icon="bank"
          action={() => {
            router.push({
              pathname: "/tabs/orders/ShowQrCode",
              params: {
                chavePix: "chave-pix-aqui",
                nomeRecebedor: "Nome Recebedor",
                cidadeRecebedor: "Cidade Recebedor",
                valor: Number(valorVenda),
                infoAdicional: "Pagamento de teste",
              },
            });
          }}
        />
      </View>
      <View style={styleDetailOrder.space}>
        <MyButton title="Atualizar Venda" icon="send" action={atualizarOrder} />
      </View>
    </View>
  );
}

export default DetailOrderScreen;
