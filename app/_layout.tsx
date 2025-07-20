import { BundleInspector } from '../.rorkai/inspector';
import { RorkErrorBoundary } from '../.rorkai/rork-error-boundary';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { VapourTextEffect } from "@/components/ui/vapour-text-effect";
import Colors from "@/constants/colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="story/[id]" options={{ headerShown: false, presentation: "card" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <VapourTextEffect 
            texts={["Echo", "Your Personal", "AI Storyteller"]}
            onComplete={handleSplashComplete}
            fontSize={42}
            color={Colors.primary}
          />
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <BundleInspector><RorkErrorBoundary><RootLayoutNav /></RorkErrorBoundary></BundleInspector>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}