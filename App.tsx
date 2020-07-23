import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";

import { Routes } from "./routes";
import { LoadAssets, StyleGuide } from "./src/components";
import Picker from "./src/Picker";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const Stack = createStackNavigator<Routes>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Picker" component={Picker} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppNavigator />
    </LoadAssets>
  );
}
