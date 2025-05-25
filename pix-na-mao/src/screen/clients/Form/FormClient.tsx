import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import FormStyle from "./FormStyle";
import MyInput from "../../../components/MyInput/MyInput";
import MySwitch from "../../../components/Switch/MySwitch";
import MyButton from "../../../components/MyButton/MyButton";

function FormClient() {
  const [clientName, setClienteName] = React.useState("");
  const [clientPhone, setClientePhone] = React.useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View>
      <View style={FormStyle.text}>
        <Text variant="headlineSmall">Adicionar Novo Cliente</Text>
      </View>
      <MyInput
        label="Nome Cliente"
        placeholder="Ex: Ana Luiza"
        value={clientName}
        onChangeText={setClienteName}
      />
      <MyInput
        label="Numero Contato"
        placeholder="Ex: 42 99999999"
        value={clientPhone}
        onChangeText={setClientePhone}
        keyboardType="phone-pad"
      />

      <View style={FormStyle.text}>
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
            const client = {
              name :clientName,
              phone :clientPhone,
              devedor:isSwitchOn
            };

            console.log(client);
          }}
        />
      </View>
    </View>
  );
}

export default FormClient;
