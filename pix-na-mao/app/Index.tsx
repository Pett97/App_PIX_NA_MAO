import React from "react";
import { Text, View } from "react-native";
import MyButton from "../src/components/MyButton";
import MyInput from "../src/components/MyInput";

function index() {
  const [teste, setText] = React.useState("");

  return (
    <View>
      <MyInput  label="nome"placeholder="teste" value={teste} onChangeText={setText} />
      <MyButton></MyButton>
    </View>
  );
}

export default index;
