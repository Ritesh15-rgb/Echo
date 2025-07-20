import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Switch, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight, User, Bell, Moon, Volume2, Globe, Lock, HelpCircle } from "lucide-react-native";
import { Header } from "@/components/Header";
import Colors from "@/constants/colors";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  rightElement,
  onPress 
}) => (
  <TouchableOpacity 
    style={styles.settingsItem} 
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress}
  >
    <View style={styles.settingsItemIcon}>
      {icon}
    </View>
    <View style={styles.settingsItemContent}>
      <Text style={styles.settingsItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
    </View>
    <View style={styles.settingsItemRight}>
      {rightElement || <ChevronRight size={20} color={Colors.mutedText} />}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const handleProfilePress = () => {
    router.push("/profile");
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="Account">
          <SettingsItem 
            icon={<User size={22} color={Colors.primary} />}
            title="Profile"
            subtitle="Edit your profile information"
            onPress={handleProfilePress}
          />
          <SettingsItem 
            icon={<Bell size={22} color={Colors.primary} />}
            title="Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#3e3e3e", true: Colors.primary }}
                thumbColor={Colors.text}
              />
            }
          />
        </SettingsSection>
        
        <SettingsSection title="Appearance">
          <SettingsItem 
            icon={<Moon size={22} color={Colors.primary} />}
            title="Dark Mode"
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: "#3e3e3e", true: Colors.primary }}
                thumbColor={Colors.text}
              />
            }
          />
          <SettingsItem 
            icon={<Volume2 size={22} color={Colors.primary} />}
            title="Sound Effects"
            onPress={() => console.log("Sound Effects pressed")}
          />
        </SettingsSection>
        
        <SettingsSection title="Preferences">
          <SettingsItem 
            icon={<Globe size={22} color={Colors.primary} />}
            title="Language"
            subtitle="English (US)"
            onPress={() => console.log("Language pressed")}
          />
        </SettingsSection>
        
        <SettingsSection title="Privacy & Security">
          <SettingsItem 
            icon={<Lock size={22} color={Colors.primary} />}
            title="Privacy Settings"
            onPress={() => console.log("Privacy Settings pressed")}
          />
        </SettingsSection>
        
        <SettingsSection title="Support">
          <SettingsItem 
            icon={<HelpCircle size={22} color={Colors.primary} />}
            title="Help & Support"
            onPress={() => console.log("Help & Support pressed")}
          />
        </SettingsSection>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Echo v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: Colors.mutedText,
    marginTop: 2,
  },
  settingsItemRight: {
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    color: Colors.mutedText,
  },
});