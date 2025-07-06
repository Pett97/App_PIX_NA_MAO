import { StyleSheet } from "react-native";

const StylePix = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chavePix: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  recebedor: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
});

export default StylePix;
