import React from 'react';
import { KeyboardTypeOptions, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import InputStyle from './InputStyle';

interface MyInputProps {
  label: string;
  mode?: "flat" | "outlined";
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}

function MyInput({
  label,
  mode = "outlined",
  placeholder,
  keyboardType = "default",
  value,
  onChangeText,
}: MyInputProps) {
  return (
    <View style={InputStyle.inputField}>
      <TextInput
        label={label}
        mode={mode}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default MyInput;
