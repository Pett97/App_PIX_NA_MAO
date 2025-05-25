import { Slot, Tabs,Stack } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { SQLiteProvider } from "expo-sqlite";

import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { adaptNavigationTheme } from "react-native-paper";
import merge from "deepmerge";
import Colors from "../src/constants/Color";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { initializeDatabse } from "../src/database/InitializeDatabase";
import ClientScreen from "../src/screen/client/ClientScreen";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

//Temas Personalizandos
const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...Colors.dark,
  },
};

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...Colors.light,
  },
};

//Teste tomara que funfe
const CombinedDefaultTheme = merge(LightTheme, CustomLightTheme);
const CombinedDarkTheme = merge(DarkTheme, CustomDarkTheme);

export default function _layout() {
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <SQLiteProvider databaseName="appDatabase.db" onInit={initializeDatabse}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <ClientScreen></ClientScreen>
        </Stack>
      </PaperProvider>
    </SQLiteProvider>
  );
}
