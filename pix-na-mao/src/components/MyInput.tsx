import React from "react";
import { View, Text,KeyboardTypeOptions } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface MyInputProps {
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}

function MyInput({
  label,
  placeholder,
  keyboardType = "default",
  value,
  onChangeText,
}: MyInputProps) {
  return (
    <View >
      <TextInput
       label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default MyInput;
