import React from "react";
import { TouchableOpacity, View } from "react-native";
import { List, Text } from "react-native-paper";
import { ClientDatabase } from "../../database/useClientsDatabase";
import Colors from "../../constants/Color";
import { StyleSheet } from "react-native";

interface ClientProps {
  data: ClientDatabase;
  action:()=>void
}

function Client({ data,action }: ClientProps) {
  return (
    <>
     <TouchableOpacity onPress={action}>
       <List.Item
        style={{
          borderRadius:50,
          marginTop:12,
          backgroundColor:
            data.devedor === 0
              ? Colors.light.primaryContainer
              : Colors.light.errorContainer,
        }}
        title={data.nome}
        description={data.contato}
        left={(props) => <List.Icon {...props} icon="account"/>}
      />
     </TouchableOpacity>
    </>
  );
}

export default Client;
