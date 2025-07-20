import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles, Plus } from "lucide-react-native";
import { Header } from "@/components/Header";
import { StoryCard } from "@/components/StoryCard";
import { CategoryPills } from "@/components/CategoryPills";
import { AIStoryGenerator } from "@/components/AIStoryGenerator";
import stories, { categories, Story } from "@/mocks/stories";
import Colors from "@/constants/colors";

export default function TimelineScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAIGenerator, setShowAIGenerator] = useState<boolean>(false);
  
  const filteredStories = selectedCategory === "All" 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const handleStoryPress = useCallback((story: Story) => {
    router.push({
      pathname: "/story/[id]",
      params: { id: story.id }
    });
  }, [router]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleAIGenerate = useCallback(() => {
    setShowAIGenerator(true);
  }, []);

  const renderStoryCard = useCallback(({ item }: { item: Story }) => (
    <StoryCard
      title={item.title}
      duration={item.duration}
      author={item.author}
      imageUrl={item.imageUrl}
      onPress={() => handleStoryPress(item)}
    />
  ), [handleStoryPress]);

  const renderHeader = () => (
    <View>
      <Header 
        title="Echo" 
        subtitle="Your Personal AI Storyteller" 
        onSearchPress={() => console.log("Search pressed")}
        onNotificationPress={() => console.log("Notification pressed")}
      />
      
      <View style={styles.aiSection}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aiCard}
        >
          <View style={styles.aiContent}>
            <Sparkles size={24} color="white" />
            <Text style={styles.aiTitle}>Create Your Story</Text>
            <Text style={styles.aiSubtitle}>Let AI craft a personalized story just for you</Text>
          </View>
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={handleAIGenerate}
            activeOpacity={0.8}
          >
            <Plus size={20} color={Colors.primary} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      
      <CategoryPills 
        categories={categories} 
        onSelectCategory={handleCategorySelect} 
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredStories}
        renderItem={renderStoryCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="stories-list"
      />
      
      {showAIGenerator && (
        <AIStoryGenerator 
          visible={showAIGenerator}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
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
  aiSection: {
    marginVertical: 20,
  },
  aiCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  aiSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  aiButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});