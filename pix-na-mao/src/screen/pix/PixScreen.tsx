import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import gerarPayloadPix from "../../services/GerarPayloadPix";

export default function PixQRCode() {

   //fazer uma validação para enviar o valor maior que 0
  const meuxPix = gerarPayloadPix({
    chavePix: "01027040900",
    nomeRecebedor: "Peterson Henrique De Padua",
    cidadeRecebedor: "Guarapuava",
    valor: 178.79,
    infoAdicional: "Teste Funcao manual",
  });
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <QRCode value={meuxPix} size={200} />
    </View>
  );
}
