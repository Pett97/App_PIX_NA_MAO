import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import QrCode from "../components/QRCODE/QrCode";

function ShowQrCodeScreen() {
  const { chavePix, nomeRecebedor, cidadeRecebedor, valor, infoAdicional } =
    useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">QR Code do Pagamento</Text>
      <QrCode
        chavePix={String(chavePix)}
        nomeRecebedor={String(nomeRecebedor)}
        cidadeRecebedor={String(cidadeRecebedor)}
        valor={Number(valor)}
        infoAdicional={String(infoAdicional)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default ShowQrCodeScreen;
