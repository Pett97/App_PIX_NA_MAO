import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const DatePickerExample = () => {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [mostrarPicker, setMostrarPicker] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setMostrarPicker(Platform.OS === 'ios'); // iOS deixa visível, Android fecha automático

    if (selectedDate) {
      setDataSelecionada(selectedDate);
    }
  };

  const abrirDatePicker = () => {
    setMostrarPicker(true);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 10 }}>
        Data do Pix: {dataSelecionada.toLocaleDateString()}
      </Text>

      <Button mode="outlined" onPress={abrirDatePicker}>
        Escolher Data
      </Button>

      {mostrarPicker && (
        <DateTimePicker
          value={dataSelecionada}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerExample;
