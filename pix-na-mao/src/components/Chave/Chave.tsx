import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { ChavePixDatabase } from "../../database/useChavesPixDatabase";
import StylePix from "./ChaveStyle";

interface ChaveProps extends ChavePixDatabase {
  nome_recebedor: string;
  cidade_recebedor: string;
  chave_pix: string;
  action: () => void;
  secondAction: () => void;
}

function Chave({
  nome_recebedor,
  cidade_recebedor,
  chave_pix,
  action,
  secondAction,
}: ChaveProps) {
  return (
    <TouchableOpacity
      style={StylePix.card}
      onPress={action}
      onLongPress={secondAction}
    >
      <Text style={StylePix.chavePix}>{chave_pix}</Text>
      <Text style={StylePix.recebedor}>Recebedor: {nome_recebedor}</Text>
    </TouchableOpacity>
  );
}

export default Chave;
