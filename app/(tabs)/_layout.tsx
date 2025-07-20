import { Tabs } from "expo-router";
import React from "react";
import { Home, Film, Users, Map, Settings } from "lucide-react-native";
import Colors from "@/constants/colors";
import ModernTabBar from "@/components/ModernTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={(props) => <ModernTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Timeline",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="episodes"
        options={{
          title: "Episodes",
          tabBarIcon: ({ color, size }) => <Film color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: "People",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}