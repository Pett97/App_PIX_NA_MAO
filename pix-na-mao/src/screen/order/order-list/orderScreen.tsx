import React, { useEffect } from "react";
import { FlatList, View } from "react-native";

import MyButton from "../../../components/MyButton/MyButton";
import Order from "../../../components/Order/Order";
import { router, useRouter } from "expo-router";
import {
  ComprasDatabase,
  useOrderDatabase,
} from "../../../database/useOrderDatabase";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

function OrderScreen() {
  const DB = useOrderDatabase();
  const [compras, setCompras] = React.useState<ComprasDatabase[]>([]);

  useEffect(() => {
    list();
  });

     async function list() {
      const response = await DB.getAll();
      
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
      <View>
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
