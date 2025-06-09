import React, { useEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';

import Client from '../../components/Client/Client';
import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';
import MySearchBar from '../../components/MySearchBar/MySearchBar';
import MySwitch from '../../components/Switch/MySwitch';
import { ClientDatabase, useClientsDatabase } from '../../database/useClientsDatabase';
import ClientScreenStyle from './ClientScreenStyle';

function ClientScreen() {
  const clienteDatabase = useClientsDatabase();
  const [refreshing, setRefreshing] = React.useState(false);
  const [id, setId] = React.useState<number | null>(null);
  const [clientes, setClientes] = React.useState<ClientDatabase[]>([]);
  const [findName, setFindName] = React.useState("");
  const [clientName, setClienteName] = React.useState("");
  const [clientPhone, setClientePhone] = React.useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(isSwitchOn);

  async function create(data: ClientDatabase) {
    try {
      if(!clientName ||!clientPhone){
        Alert.alert("Verificar Dados");
        return;
      }
      const response = await clienteDatabase.create(data);
      Alert.alert(
        "Cliente Cadastrado com sucesso id: " + response.insertedRowId
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    try {
         if(clientName == "" || clientPhone == ""){
        Alert.alert("Verificar Dados");
        return;
      }
      const response = await clienteDatabase.update({
        id: Number(id),
        nome: clientName,
        contato: clientPhone,
        devedor: isSwitchOn ? 1 : 0,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    try {
      if (id) {
        await update();
        Alert.alert("Cliente atualizado com sucesso!");
      } else {
        const data: ClientDatabase = {
          nome: clientName,
          contato: clientPhone,
          devedor: isSwitchOn ? 1 : 0,
        };
        await create(data);
      }

      setId(null);
      setClienteName("");
      setClientePhone("");
      setIsSwitchOn(false);

      await list();
    } catch (error) {
      console.log(error);
    }
  }

  async function list() {
    try {
      const response = await clienteDatabase.searchByNome(findName);
      setClientes(response);
    } catch (error) {
      console.log(error);
    }
  }

  function details(item: ClientDatabase) {
    if (item.id) setId(item.id);
    setClienteName(item.nome);
    setClientePhone(item.contato);
    setIsSwitchOn(item.devedor === 1);
  }

  async function destroy(item:ClientDatabase){
    try {
        await clienteDatabase.remove(item);
        Alert.alert("Cliente Removido Com Sucesso");
        list();
    } catch (error) {
      console.log(error);
    }
  }
  
  //para puxar os dados
  useEffect(() => {
    list();
  }, [findName]);

  return (
    <View style={{ flex: 1, margin: 15 }}>
      <View style={ClientScreenStyle.text}>
        <Text variant="headlineSmall">Clientes</Text>
      </View>

      <View>
        <MyInput
          label="Nome Cliente"
          placeholder="Ex: Ana Luiza"
          value={clientName}
          onChangeText={setClienteName}
        />
      </View>
      <View>
        <MyInput
          label="Numero Contato"
          placeholder="Ex: 42 99999999"
          value={clientPhone}
          onChangeText={setClientePhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={ClientScreenStyle.text}>
        <Text variant="headlineSmall">Devedor?</Text>
      </View>
      <View>
        <MySwitch
          firstText="Não"
          secondText="Sim"
          value={isSwitchOn}
          onValueChange={setIsSwitchOn}
        />
      </View>
      <View>
        <MyButton
          title="Salvar"
          icon="send"
          action={() => {
            const client: ClientDatabase = {
              nome: clientName,
              contato: clientPhone,
              devedor: isSwitchOn ? 1 : 0,
            };
            handleSave();
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <MySearchBar
          placeholder="Buscar Cliente"
          value={findName}
          search={setFindName}
        ></MySearchBar>
      </View>
      <View style={{ flex: 1, margin: 15 }}>
        <FlatList
          data={clientes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Client
              data={item}
              action={() => details(item)}
              secondAction={() => destroy(item)}
            ></Client>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

export default ClientScreen;
