import React, { useEffect } from "react";
import {
  ClientDatabase,
  useClientsDatabase,
} from "../../database/useClientsDatabase";
import { Alert, View } from "react-native";
import { Text } from "react-native-paper";
import ClientScreenStyle from "./ClientScreenStyle";
import MyInput from "../../components/MyInput/MyInput";
import MySwitch from "../../components/Switch/MySwitch";
import MyButton from "../../components/MyButton/MyButton";
import MySearchBar from "../../components/MySearchBar/MySearchBar";
import { FlatList } from "react-native";

import Client from "../../components/Client/Client";

function ClientScreen() {
  const clienteDatabase = useClientsDatabase();
  const [refreshing, setRefreshing] = React.useState(false);
  const [clientes, setClientes] = React.useState<ClientDatabase[]>([]);
  const [findName, setFindName] = React.useState("");
  const [clientName, setClienteName] = React.useState("");
  const [clientPhone, setClientePhone] = React.useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(isSwitchOn);

  async function create(dataClient: ClientDatabase) {
    try {
      const response = await clienteDatabase.create(dataClient);
      Alert.alert(
        "Cliente Cadastrado com sucesso id: " + response.insertedRowId
      );
      setClienteName("");
      setClientePhone("");
      setIsSwitchOn(false);
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

  useEffect(() => {
    list();
  }, [findName]);

  return (
    <View style={{ flex: 1, margin: 15 }}>
      <View style={ClientScreenStyle.text}>
        <Text variant="headlineSmall">Adicionar Novo Cliente</Text>
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
            create(client);
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
          renderItem={({ item }) => <Client data={item}></Client>}
        ></FlatList>
      </View>
    </View>
  );
}

export default ClientScreen;
