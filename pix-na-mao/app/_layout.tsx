import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

function _layout() {
  return (
    <Tabs >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teste"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default _layout;
