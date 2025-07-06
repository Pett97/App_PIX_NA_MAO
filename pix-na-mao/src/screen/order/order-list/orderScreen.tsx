import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, View } from "react-native";

import MyButton from "../../../components/MyButton/MyButton";
import Order from "../../../components/Order/Order";
import {
  ComprasDatabaseFormatada,
  useOrderDatabase,
} from "../../../database/useOrderDatabase";
import { handleDelete } from "../../../handle/handleDelete";
import testeStyle from "./OrderScreenStyle";

function OrderScreen() {
  const DB = useOrderDatabase();
  const router = useRouter();
  const [compras, setCompras] = useState<ComprasDatabaseFormatada[]>([]);

  const list = useCallback(async () => {
    try {
      const response = await DB.getVendasFormatadas();
      console.log(response);
      setCompras(response);
    } catch (error) {
      console.error("Erro ao listar vendas:", error);
    }
  }, [DB]);

  const redirect = useCallback(() => {
    router.push("orders/NewOrder");
  }, [router]);

  const detailOrderRedirect = useCallback(
    (order: ComprasDatabaseFormatada) => {
      router.push(`orders/${order.id}`);
    },
    [router],
  );

  const destroyOrder = useCallback(
    async (order: ComprasDatabaseFormatada) => {
      try {
        await DB.remove(order);
        list();
      } catch (error) {
        console.error(error);
        Alert.alert("Não foi possível deletar Compra");
      }
    },
    [DB, list],
  );

  useFocusEffect(
    useCallback(() => {
      list();
    }, [list]),
  );

  return (
    <View>
      <View>
        <MyButton
          title="Adicionar Venda"
          icon="plus-circle"
          action={redirect}
        />
      </View>
      <View style={testeStyle.lista}>
        <FlatList
          data={compras}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Order
              data={item}
              action={() => detailOrderRedirect(item)}
              secondAction={() => {
                handleDelete("Cancelar", "Deletar", () => destroyOrder(item));
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

export default OrderScreen;
