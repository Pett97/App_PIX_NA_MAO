import React from "react";
import { TouchableOpacity, View } from "react-native";
import { List } from "react-native-paper";

import Colors from "../../constants/Color";
import { ClientDatabase } from "../../database/useClientsDatabase";
import ClientStyle from "./ClientStyle";

interface ClientProps {
  data: ClientDatabase;
  action?: () => void;
  secondAction?: () => void;
  showDeleteIcon?: boolean;
}

function Client({
  data,
  action,
  secondAction,
  showDeleteIcon = true,
}: ClientProps) {
  return (
    <View style={ClientStyle.container}>
      <TouchableOpacity onPress={action}>
        <List.Item
          style={{
            borderRadius: 50,
            marginTop: 12,
            backgroundColor:
              data.devedor === 0
                ? Colors.light.primaryContainer
                : Colors.light.errorContainer,
          }}
          title={data.nome}
          description={data.contato}
          right={(props) =>
            showDeleteIcon && secondAction ? (
              <TouchableOpacity onLongPress={secondAction}>
                <List.Icon {...props} icon="delete" color="red" />
              </TouchableOpacity>
            ) : null
          }
        />
      </TouchableOpacity>
    </View>
  );
}

export default Client;
