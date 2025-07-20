import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";
import { Header } from "@/components/Header";
import Colors from "@/constants/colors";

interface Character {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const characters: Character[] = [
  {
    id: "1",
    name: "Professor Artemis",
    role: "Archaeologist",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Captain Elara",
    role: "Ship Captain",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Dr. Marcus",
    role: "Scientist",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Luna",
    role: "Guide",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Commander Zane",
    role: "Military Leader",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop",
  },
];

export default function PeopleScreen() {
  const renderCharacterItem = ({ item }: { item: Character }) => (
    <TouchableOpacity style={styles.characterItem} activeOpacity={0.7}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.characterImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterRole}>{item.role}</Text>
      </View>
      <ChevronRight size={20} color={Colors.mutedText} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="People" 
        subtitle="Characters in your stories" 
        onSearchPress={() => console.log("Search pressed")}
      />
      
      <FlatList
        data={characters}
        renderItem={renderCharacterItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="characters-list"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  characterItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  characterInfo: {
    flex: 1,
    marginLeft: 16,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  characterRole: {
    fontSize: 14,
    color: Colors.mutedText,
    marginTop: 2,
  },
});