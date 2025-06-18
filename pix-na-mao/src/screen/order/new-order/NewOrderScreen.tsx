import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import MyInput from '../../../components/MyInput/MyInput';
import MyPicker from '../../../components/MyPicker/MyPicker';
import { ChavePixDatabase, useChavePixDatabse } from '../../../database/useChavesPixDatabase';
import { ClientDatabase, useClientsDatabase } from '../../../database/useClientsDatabase';
import DatePickerExample from '../../../components/Calender/Calender';
function NewOrderScreen() {
  const databaseClientes = useClientsDatabase();
  const databaseChavePix = useChavePixDatabse();
  const [clientes, setClientes] = useState<ClientDatabase[]>([]);
  const [chavesPix, setChavesPix] = useState<ChavePixDatabase[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedChavePix, setSelectedChavePix] = useState<string>("");
  const [pixAgendado, setPixAgendado] = useState<boolean>(false);
  const [valorVenda, setValorVenda] = useState("");
  

  async function buscarClientes() {
    const response = await databaseClientes.getAll();
    setClientes(response);
  }

  async function buscarChavePix() {
    const response = await databaseChavePix.getAll();
    setChavesPix(response);
  }

  useEffect(() => {
    buscarChavePix();
    buscarClientes();
  }, []);

  const listaDeClientes = clientes.map((cliente) => ({
    label: cliente.nome,
    value: String(cliente.id),
  }));

  const listaChavexPix = chavesPix.map((chavePix) => ({
    label: `${chavePix.nome_recebedor} - ${chavePix.chave_pix}`,
    value: String(chavePix.id),
  }));

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
    <DatePickerExample></DatePickerExample>
      </View>
    </View>
  );
}

export default NewOrderScreen;
