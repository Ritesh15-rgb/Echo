import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { MapPin } from "lucide-react-native";
import { Header } from "@/components/Header";
import Colors from "@/constants/colors";

interface Location {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const locations: Location[] = [
  {
    id: "1",
    name: "Atlantis",
    description: "The lost underwater city with advanced technology",
    imageUrl: "https://images.unsplash.com/photo-1682686580391-615b1f28e6d0?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Dark Forest",
    description: "A mysterious forest filled with ancient secrets",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Cosmic Station",
    description: "Space station at the edge of the galaxy",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1222&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Enchanted Kingdom",
    description: "A magical realm where fantasy comes to life",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1169&auto=format&fit=crop",
  },
];

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Map" 
        subtitle="Explore story locations" 
        onSearchPress={() => console.log("Search pressed")}
      />
      
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1174&auto=format&fit=crop" }}
          style={styles.mapImage}
          contentFit="cover"
        />
        
        {locations.map((location, index) => {
          const positions = [
            { top: "20%", left: "30%" },
            { top: "40%", left: "70%" },
            { top: "60%", left: "20%" },
            { top: "70%", left: "60%" },
          ];
          const position = positions[index % positions.length];
          
          return (
            <TouchableOpacity 
              key={location.id}
              style={[styles.mapPin, position]}
              activeOpacity={0.8}
            >
              <MapPin size={28} color={Colors.primary} fill={Colors.primary} />
            </TouchableOpacity>
          );
        })}
      </View>
      
      <ScrollView 
        style={styles.locationsContainer}
        contentContainerStyle={styles.locationsContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Locations</Text>
        
        {locations.map(location => (
          <TouchableOpacity 
            key={location.id}
            style={styles.locationItem}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: location.imageUrl }}
              style={styles.locationImage}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationDescription} numberOfLines={2}>
                {location.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapContainer: {
    height: 250,
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapPin: {
    position: "absolute",
    transform: [{ translateX: -14 }, { translateY: -28 }],
  },
  locationsContainer: {
    flex: 1,
  },
  locationsContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    height: 80,
  },
  locationImage: {
    width: 80,
    height: "100%",
  },
  locationInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  locationName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: Colors.mutedText,
  },
});