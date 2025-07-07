import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import * as Linking from "expo-linking";

import Colors from "../src/constants/Color";
import { initializeDatabse } from "../src/database/InitializeDatabase";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

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

const CombinedDefaultTheme = merge(LightTheme, CustomLightTheme);
const CombinedDarkTheme = merge(DarkTheme, CustomDarkTheme);

export default function Layout() {
  const prefix = Linking.createURL("/");
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <SQLiteProvider databaseName="appDatabase.db" onInit={initializeDatabse}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen
            name="orders/ShowQrCode"
            options={{
              title: "Visualizar QRCODE",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </PaperProvider>
    </SQLiteProvider>
  );
}
