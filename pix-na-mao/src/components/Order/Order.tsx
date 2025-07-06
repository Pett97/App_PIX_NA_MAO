import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { ComprasDatabaseFormatada } from "../../database/useOrderDatabase";
import OrderStyle from "./OrderStyle";
import Colors from "../../constants/Color";

interface OrderProps {
  data: ComprasDatabaseFormatada;
  action?: () => void;
  secondAction?: () => void;
}

function Order({ data, action, secondAction }: OrderProps) {
  return (
    <TouchableOpacity onPress={action} onLongPress={secondAction}>
      <View
        style={[
          OrderStyle.card,
          {
            backgroundColor:
              data.status === 1
                ? Colors.light.primaryContainer
                : Colors.light.errorContainer,
          },
        ]}
      >
        <View style={OrderStyle.client}>
          <Text>
            ID:{data.id} Cliente: {data.idCliente} - {data.nomeCliente}
          </Text>
        </View>
        <View style={OrderStyle.orderAbout}>
          <Text>Status: {data.status}</Text>
          <Text>Valor: R$ {data.valor}</Text>
        </View>
        <View style={OrderStyle.orderAbout}>
          <Text>Agendado: {data.agendado ? "Sim" : "Não"}</Text>
          <Text>
            {" "}
            Data Agendamento:{" "}
            {data.dataAgendamento
              ? new Date(data.dataAgendamento).toLocaleDateString("pt-br")
              : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Order;
