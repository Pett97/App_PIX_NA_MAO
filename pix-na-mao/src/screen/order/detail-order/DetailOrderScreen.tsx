import { Picker } from '@react-native-picker/picker';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Text } from 'react-native-paper';

import Calender from '../../../components/Calender/Calender';
import MyButton from '../../../components/MyButton/MyButton';
import MyInput from '../../../components/MyInput/MyInput';
import MyPicker from '../../../components/MyPicker/MyPicker';
import { ChavePixDatabase, useChavePixDatabse } from '../../../database/useChavesPixDatabase';
import { ClientDatabase, useClientsDatabase } from '../../../database/useClientsDatabase';
import { ComprasDatabase, useOrderDatabase } from '../../../database/useOrderDatabase';

function DetailOrderScreen() {
  const {id} = useLocalSearchParams();
  const databaseCompras = useOrderDatabase();
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

  async function buscarClientes() {
    const response = await databaseClientes.getAll();
    setClientes(response);
  }

  async function buscarChavePix() {
    const response = await databaseChavePix.getAll();
    setChavesPix(response);
  }

  async function buscarDadosCompra() {
    const response = await databaseCompras.getCompraById(Number(id));
    console.log(response);
  }

  useFocusEffect(
    useCallback(() => {
      buscarDadosCompra();
      buscarChavePix();
      buscarClientes();
    }, [])
  );

  const listaDeClientes = clientes.map((cliente) => ({
    label: cliente.nome,
    value: String(cliente.id),
  }));

  const listaChavexPix = chavesPix.map((chavePix) => ({
    label: `${chavePix.nome_recebedor} - ${chavePix.chave_pix}`,
    value: String(chavePix.id),
  }));

  async function salvarVenda() {
    const dataVenda: ComprasDatabase = {
      valor: Number(valorVenda),
      idChavePix: Number(selectedChavePix),
      idCliente: Number(selectedCliente),
      agendado: Number(pixAgendado),
      dataAgendamento: dataAgendamentoPix,
      status: 1,
    };
    try {
      const response = await DB.create(dataVenda);
    } catch (error) {
      Alert.alert("Não Foi possivel Salvar Venda ");
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
        ></MyInput>
      </View>
      <View>
        <Text>esse pix é agendado? </Text>
        <Picker
          selectedValue={pixAgendado ? "true" : "false"}
          onValueChange={(itemValue) => setPixAgendado(itemValue === "true")}
        >
          <Picker.Item label="Não" value="false" />
          <Picker.Item label="Sim" value="true" />
        </Picker>
      </View>
      <View>
        <Calender onChangeData={setDataAgendamentoPix} dataAgendamento={dataAgendamentoPix}></Calender>
      </View>
      <View>
        <MyButton
          title="Salvar Venda"
          icon="send"
          action={() => {
            salvarVenda();
          }}
        ></MyButton>
      </View>
    </View>
  );
}

export default DetailOrderScreen;
