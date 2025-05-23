import React from "react";
import { Text, View } from "react-native";
import Paragrafo from "../src/components/Paragrafo";

function index() {
  return (
    <View className="bg-green-500">
      <Text>Teste Router</Text>
      <Paragrafo></Paragrafo>
    </View>
  );
}

export default index;
