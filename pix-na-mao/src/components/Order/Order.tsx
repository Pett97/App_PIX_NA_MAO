import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import OrderStyle from "./OrderStyle";
import { ComprasDatabase } from "../../database/useOrderDatabase";

interface OrderProps {
  data: ComprasDatabase;
}

function Order({ data }: OrderProps) {
  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.client}>
        <Text>ID Cliente: {data.idCliente}</Text>
      </View>
      <View style={OrderStyle.orderAbout}>
        <Text>Status: {data.status}</Text>
        <Text>Valor: R$ {data.valor}</Text>
        <Text>ID Chave Pix: {data.idChavePix}</Text>
      </View>
      <View style={OrderStyle.orderAbout}>
        <Text>Agendado: {data.agendado ? "Sim" : "Não"}</Text>
        <Text>Data Agendamento: {data.dataAgendamento?.toString() || ""}</Text>
      </View>
    </View>
  );
}

export default Order;
