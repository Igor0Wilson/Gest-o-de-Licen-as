import "react-native-gesture-handler";

import React from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Routes } from "./src/routes";
import theme from "./src/theme";
import { NativeBaseProvider } from "native-base";
import AuthProvider from "./src/contexts/auth";


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="dark" translucent backgroundColor="transparent" />
          <AuthProvider>
            <Routes  />
          </AuthProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
