import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { Header } from "@/components/Header";
import Colors from "@/constants/colors";

interface Episode {
  id: string;
  title: string;
  imageUrl: string;
  progress: number;
}

const episodes: Episode[] = [
  {
    id: "1",
    title: "The Lost City of Atlantis - Part 1",
    imageUrl: "https://images.unsplash.com/photo-1682686580391-615b1f28e6d0?q=80&w=1170&auto=format&fit=crop",
    progress: 100,
  },
  {
    id: "2",
    title: "The Lost City of Atlantis - Part 2",
    imageUrl: "https://images.unsplash.com/photo-1682686580391-615b1f28e6d0?q=80&w=1170&auto=format&fit=crop",
    progress: 75,
  },
  {
    id: "3",
    title: "Whispers in the Dark Forest - Part 1",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop",
    progress: 50,
  },
  {
    id: "4",
    title: "Journey to the Stars - Part 1",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1222&auto=format&fit=crop",
    progress: 25,
  },
];

export default function EpisodesScreen() {
  const renderEpisodeItem = ({ item }: { item: Episode }) => (
    <View style={styles.episodeItem}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.episodeImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.episodeContent}>
        <Text style={styles.episodeTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Episodes" 
        subtitle="Continue your journey" 
        onSearchPress={() => console.log("Search pressed")}
      />
      
      <FlatList
        data={episodes}
        renderItem={renderEpisodeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="episodes-list"
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
  episodeItem: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    height: 100,
  },
  episodeImage: {
    width: 100,
    height: "100%",
  },
  episodeContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  episodeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
});