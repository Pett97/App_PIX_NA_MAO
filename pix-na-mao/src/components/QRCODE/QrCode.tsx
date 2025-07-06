import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import gerarPayloadPix from "../../services/GerarPayloadPix";

interface QRCODEProps {
  chavePix: string;
  nomeRecebedor: string;
  cidadeRecebedor: string;
  valor: number;
  infoAdicional: string;
}

// TODO na info adicional colocar o nome do pagadador
function QrCode({ chavePix,nomeRecebedor,cidadeRecebedor,valor,infoAdicional}:QRCODEProps) {
   const pix =  gerarPayloadPix({chavePix,nomeRecebedor,cidadeRecebedor,valor,infoAdicional});

  return <View>
   <QRCode value={pix} size={200}></QRCode>
  </View>;
}

export default QrCode;
