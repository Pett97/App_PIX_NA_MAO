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

function QrCode({ chavePix,nomeRecebedor,cidadeRecebedor,valor,infoAdicional}:QRCODEProps) {
    nomeRecebedor = nomeRecebedor.trim();
    cidadeRecebedor  = cidadeRecebedor.trim();

   const pix =  gerarPayloadPix({chavePix,nomeRecebedor,cidadeRecebedor,valor});
  console.log(pix);
  return <View>
   <QRCode value={pix} size={200}></QRCode>
  </View>;
}

export default QrCode;
