import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import { Text, Button } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface CalenderProps {
  onChangeData: (data: string) => void;
  dataAgendamento?: string;
}

const Calender = ({ onChangeData, dataAgendamento }: CalenderProps) => {
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());

  useEffect(() => {
    if (dataAgendamento) {
      const [year, month, day] = dataAgendamento.split("-").map(Number);
      setDataSelecionada(new Date(year, month - 1, day));
    }
  }, [dataAgendamento]);

  function formatToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setMostrarPicker(false);
    }

    if (selectedDate) {
      setDataSelecionada(selectedDate);
      const isoDateString = formatToYYYYMMDD(selectedDate);
      onChangeData(isoDateString);
    }
  };

  const abrirDatePicker = () => {
    setMostrarPicker(true);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 10 }}>
        Data do Agendamento: {formatToYYYYMMDD(dataSelecionada)}
      </Text>

      <Button mode="outlined" onPress={abrirDatePicker}>
        Escolher Data
      </Button>

      {mostrarPicker && (
        <DateTimePicker
          value={dataSelecionada}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Calender;
