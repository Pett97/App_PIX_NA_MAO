import { Alert } from "react-native";

export function handleDelete(
  cancel: string,
  confirm: string,
  onConfirm: () => Promise<void>,
) {
  Alert.alert("Confirmar Exclusão", "Tem certeza que deseja excluir?", [
    { text: cancel, style: "cancel" },
    {
      text: confirm,
      style: "destructive",
      onPress: () => {
        onConfirm().catch((err) => {
          console.error("Erro ao excluir:", err);
        });
      },
    },
  ]);
}
