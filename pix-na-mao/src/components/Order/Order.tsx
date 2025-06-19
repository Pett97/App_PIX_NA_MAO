import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { ComprasDatabaseFormatada } from "../../database/useOrderDatabase";
import OrderStyle from "./OrderStyle";

interface OrderProps {
  data: ComprasDatabaseFormatada;
}

function Order({ data }: OrderProps) {

  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.client}>
        <Text>
          Cliente: {data.idCliente} - {data.nomeCliente}
        </Text>
      </View>
      <View style={OrderStyle.orderAbout}>
        <Text>Status: {data.status}</Text>
        <Text>Valor: R$ {data.valor}</Text>
      </View>
      <View style={OrderStyle.orderAbout}>
        <Text>Agendado: {data.agendado ? "Sim" : "Não"}</Text>
        <Text>
          {" "} Data Agendamento: {" "}{data.dataAgendamento? new Date(data.dataAgendamento).toLocaleDateString('pt-br') : ""}
        </Text>
      </View>
    </View>
  );
}

export default Order;
