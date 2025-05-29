import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';
import { Tabs } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';
import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

import Colors from '../src/constants/Color';
import { initializeDatabse } from '../src/database/InitializeDatabase';

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
    <Tabs>
      <Tabs.Screen
        name="Index"
        options={{
          headerShown:false,
          title: "Clientes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teste"
        options={{
          title: "Teste",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="build" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
      </PaperProvider>
    </SQLiteProvider>
  );
}
