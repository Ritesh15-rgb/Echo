import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Bell, Search, Sparkles } from "lucide-react-native";
import Colors from "@/constants/colors";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onSearchPress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradient}
          >
            <Text style={styles.title}>{title}</Text>
            <Sparkles size={20} color="white" style={styles.sparkle} />
          </LinearGradient>
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onSearchPress}
          testID="search-button"
          activeOpacity={0.7}
        >
          <Search size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onNotificationPress}
          testID="notification-button"
          activeOpacity={0.7}
        >
          <Bell size={20} color={Colors.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  sparkle: {
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mutedText,
    marginTop: 8,
    marginLeft: 4,
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
});