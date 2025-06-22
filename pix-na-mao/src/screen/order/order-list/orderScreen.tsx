import React, { useEffect } from "react";
import { Alert, FlatList, View } from "react-native";

import MyButton from "../../../components/MyButton/MyButton";
import Order from "../../../components/Order/Order";
import { router, useRouter } from "expo-router";
import {
  ComprasDatabaseFormatada,
  useOrderDatabase,
} from "../../../database/useOrderDatabase";
import testeStyle from "./OrderScreenStyle";
import { handleDelete } from "../../../handle/handleDelete";

function OrderScreen() {
  const DB = useOrderDatabase();
  const router = useRouter();
  const [compras, setCompras] = React.useState<ComprasDatabaseFormatada[]>([]);

  useEffect(() => {
    list();
  });

  async function list() {
    const response = await DB.getVendasFormatadas();
    setCompras(response);
  }

  function redirect() {
    router.push("orders/NewOrder");
  }

  function detailOrderRedirect(idOrder: number): void {
    router.push(`orders/${idOrder}`);
  }

  async function destroyOrder(order: ComprasDatabaseFormatada) {
    try {
      await DB.remove(order);
      list();
    } catch (error) {
      Alert.alert("Não foi possivel deletar Compra");
    }
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
          renderItem={({ item }) => (
            <Order
              data={item}
              action={() => detailOrderRedirect(Number(item.id))}
              secondAction={() => {
                handleDelete("Cancelar", "Deletar", () => destroyOrder(item));
              }}
            ></Order>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

export default OrderScreen;
