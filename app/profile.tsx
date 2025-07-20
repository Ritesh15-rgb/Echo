import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, User, Mail, Phone, Calendar, Save } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon,
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) => (
  <View style={styles.fieldContainer}>
    <View style={styles.fieldHeader}>
      <View style={styles.fieldIcon}>
        {icon}
      </View>
      <Text style={styles.fieldLabel}>{label}</Text>
    </View>
    <TextInput
      style={styles.fieldInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.mutedText}
      keyboardType={keyboardType}
    />
  </View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2024",
  });

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile information has been saved successfully.",
      [{ text: "OK" }]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            style={styles.avatarContainer}
          >
            <User size={48} color="white" />
          </LinearGradient>
          <Text style={styles.avatarName}>{profile.name}</Text>
          <Text style={styles.avatarSubtitle}>Echo Storyteller</Text>
        </View>

        <View style={styles.formSection}>
          <ProfileField
            icon={<User size={20} color={Colors.primary} />}
            label="Full Name"
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            placeholder="Enter your full name"
          />

          <ProfileField
            icon={<Mail size={20} color={Colors.primary} />}
            label="Email Address"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            placeholder="Enter your email address"
            keyboardType="email-address"
          />

          <ProfileField
            icon={<Phone size={20} color={Colors.primary} />}
            label="Phone Number"
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <View style={styles.fieldIcon}>
                <Calendar size={20} color={Colors.primary} />
              </View>
              <Text style={styles.fieldLabel}>Member Since</Text>
            </View>
            <View style={styles.readOnlyField}>
              <Text style={styles.readOnlyText}>{profile.joinDate}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            style={styles.saveButtonGradient}
          >
            <Save size={20} color="white" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  avatarSubtitle: {
    fontSize: 16,
    color: Colors.mutedText,
  },
  formSection: {
    paddingHorizontal: 20,
    gap: 24,
  },
  fieldContainer: {
    gap: 12,
  },
  fieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.softBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  fieldInput: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  readOnlyField: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    opacity: 0.7,
  },
  readOnlyText: {
    fontSize: 16,
    color: Colors.mutedText,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 12,
    overflow: "hidden",
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});