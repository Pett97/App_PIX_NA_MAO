import { Picker } from "@react-native-picker/picker";
import React from "react";

interface PickerItem {
  label: string;
  value: string;
}

interface MyPickerProps {
  label: string;
  value: string;
  onValueChange: (itemValue: string) => void;
  items: PickerItem[];
}

function MyPicker({ label, value, onValueChange, items }: MyPickerProps) {
  return (
    <Picker selectedValue={value} onValueChange={onValueChange}>
      <Picker.Item label={label} value="" />
      {items.map((item, index) => (
        <Picker.Item key={index} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
}

export default MyPicker;
