import React, { useEffect } from "react";
import { FlatList, View } from "react-native";

import MyButton from "../../../components/MyButton/MyButton";
import Order from "../../../components/Order/Order";
import { router, useRouter } from "expo-router";
import {
  ComprasDatabaseFormatada,
  useOrderDatabase,
} from "../../../database/useOrderDatabase";
import testeStyle from "./OrderScreenStyle";

function OrderScreen() {
  const DB = useOrderDatabase();
  const [compras, setCompras] = React.useState<ComprasDatabaseFormatada[]>([]);

  useEffect(() => {
    list();
  });

     async function list() {
      const response = await DB.getVendasFormatadas();
      setCompras(response);
    }
  function redirect() {
    const router = useRouter();
    router.push("orders/NewOrder");
  }

  return (
    <View>
      <View>
        <MyButton
          title="Adicionar Venda"
          icon="plus-circle"
          action={() => {
            redirect();
          }}
        ></MyButton>
      </View>
      <View style={testeStyle.lista}>
        <FlatList
          data={compras}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Order data={item}></Order>}
        ></FlatList>
      </View>
    </View>
  );
}

export default OrderScreen;
