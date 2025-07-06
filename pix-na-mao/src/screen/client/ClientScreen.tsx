import React, { useCallback, useEffect } from "react";
import { Alert, FlatList, View } from "react-native";
import { Text } from "react-native-paper";

import Client from "../../components/Client/Client";
import MyButton from "../../components/MyButton/MyButton";
import MyInput from "../../components/MyInput/MyInput";
import MySearchBar from "../../components/MySearchBar/MySearchBar";
import MySwitch from "../../components/Switch/MySwitch";
import {
  ClientDatabase,
  useClientsDatabase,
} from "../../database/useClientsDatabase";
import ClientScreenStyle from "./ClientScreenStyle";

function ClientScreen() {
  const clienteDatabase = useClientsDatabase();

  const [id, setId] = React.useState<number | null>(null);
  const [clientes, setClientes] = React.useState<ClientDatabase[]>([]);
  const [findName, setFindName] = React.useState("");
  const [clientName, setClienteName] = React.useState("");
  const [clientPhone, setClientePhone] = React.useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const list = useCallback(async () => {
    try {
      const response = await clienteDatabase.searchByNome(findName);
      setClientes(response);
    } catch (error) {
      console.log(error);
    }
  }, [clienteDatabase, findName]);

  async function create(data: ClientDatabase) {
    if (!validate(data)) return;
    try {
      if (!clientName || !clientPhone) {
        Alert.alert("Verificar Dados");
        return;
      }
      const response = await clienteDatabase.create(data);
      Alert.alert(
        "Cliente cadastrado com sucesso! ID: " + response.insertedRowId,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    const data: ClientDatabase = {
      id: Number(id),
      nome: clientName,
      contato: clientPhone,
      devedor: isSwitchOn ? 1 : 0,
    };

    if (!validate(data)) return;

    try {
      await clienteDatabase.update(data);
      Alert.alert("Cliente atualizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    try {
      if (id) {
        await update();
      } else {
        const data: ClientDatabase = {
          nome: clientName,
          contato: clientPhone,
          devedor: isSwitchOn ? 1 : 0,
        };
        await create(data);
      }

      // Resetar campos
      setId(null);
      setClienteName("");
      setClientePhone("");
      setIsSwitchOn(false);

      await list();
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

  function validate(item: ClientDatabase): boolean {
    if (!item.nome || item.nome.trim().length < 3) {
      Alert.alert("O nome do cliente deve ter pelo menos 3 caracteres.");
      return false;
    }
    return true;
  }

  async function destroy(item: ClientDatabase) {
    try {
      await clienteDatabase.remove(item);
      Alert.alert("Cliente removido com sucesso");
      await list();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    list();
  }, [list]);

  return (
    <View style={{ flex: 1, margin: 15 }}>
      <View style={ClientScreenStyle.text}>
        <Text variant="headlineSmall">Clientes</Text>
      </View>

      <MyInput
        label="Nome Cliente"
        placeholder="Ex: Ana Luiza"
        value={clientName}
        onChangeText={setClienteName}
      />

      <MyInput
        label="Número Contato"
        placeholder="Ex: 42 99999999"
        value={clientPhone}
        onChangeText={setClientePhone}
        keyboardType="phone-pad"
      />

      <View style={ClientScreenStyle.text}>
        <Text variant="headlineSmall">Devedor?</Text>
      </View>
      <MySwitch
        firstText="Não"
        secondText="Sim"
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
      />

      <MyButton title="Salvar" icon="send" action={handleSave} />

      <View style={{ marginTop: 20 }}>
        <MySearchBar
          placeholder="Buscar Cliente"
          value={findName}
          search={setFindName}
        />
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
            />
          )}
        />
      </View>
    </View>
  );
}

export default ClientScreen;
