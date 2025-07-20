import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeft, Play, Clock, User, Share2, FileText, Sparkles } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { TextEffect } from "@/components/ui/text-effect";
import stories, { Story } from "@/mocks/stories";
import Colors from "@/constants/colors";

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [summaryAnimationComplete, setSummaryAnimationComplete] = useState<boolean>(false);
  
  useEffect(() => {
    if (id) {
      const foundStory = stories.find(s => s.id === id);
      if (foundStory) {
        setStory(foundStory);
      }
    }
  }, [id]);

  const handleBackPress = () => {
    router.back();
  };

  const handlePlayPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    console.log("Play story:", story?.title);
  };

  const handleSharePress = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    console.log("Share story:", story?.title);
  };

  const handleSummaryPress = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    setShowSummary(true);
    setSummaryAnimationComplete(false);
  };

  const getSummaryText = () => {
    if (!story) return "";
    
    const summaries: Record<string, string> = {
      "1": "Deep beneath the ocean waves lies Atlantis, a magnificent city of crystal spires and flowing water channels. Dr. Marina Wells discovers ancient technology that could change humanity's future, but awakening the city's guardians brings unexpected consequences.",
      "2": "In the heart of an ancient forest, strange whispers echo through the trees at midnight. Sarah, a young botanist, uncovers a hidden world where plants communicate through bioluminescent signals, revealing secrets that have been buried for centuries.",
      "3": "Captain Alex Rivera leads humanity's first mission beyond the solar system aboard the starship Horizon. When they encounter an alien artifact near Proxima Centauri, the crew must decide whether to make contact or return home with their discovery.",
      "4": "Princess Lyra discovers she possesses the rare gift of dream magic in the kingdom of Aethermoor. As dark forces threaten to consume the realm, she must master her powers and unite the scattered magical clans before it's too late.",
      "5": "Archaeologist Dr. James Carter uncovers a tomb that predates known civilization by thousands of years. Inside, hieroglyphs tell of an advanced race that once ruled Earth, and their warning about a cosmic threat that returns every millennium.",
      "6": "The old Victorian mansion on Elm Street has stood empty for decades, but recent owners report strange phenomena. Paranormal investigator Emma Stone discovers the house exists in multiple dimensions simultaneously, trapping souls across time.",
      "7": "When time-travel researcher Dr. Elena Vasquez accidentally creates a temporal rift, she meets her soulmate from the 18th century. Their love story spans across centuries as they fight to find a way to be together without destroying the timeline.",
      "8": "Detective Marcus Kane faces his most challenging case yet: a series of murders that seem to predict future events. As he delves deeper, he realizes the killer might be trying to prevent a catastrophic future, making Kane question everything he believes about justice."
    };
    
    return summaries[story.id] || "This captivating story takes you on an unforgettable journey filled with mystery, adventure, and discovery. Experience a tale that will transport you to new worlds and leave you questioning the boundaries of imagination.";
  };

  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading story...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: story.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackPress}
            testID="back-button"
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButton} 
            onPress={handleSharePress}
            testID="share-button"
          >
            <Share2 size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{story.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.mutedText} />
              <Text style={styles.metaText}>{story.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <User size={16} color={Colors.mutedText} />
              <Text style={styles.metaText}>{story.author}</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.summaryButton}
              onPress={handleSummaryPress}
              activeOpacity={0.8}
              testID="summary-button"
            >
              <FileText size={20} color={Colors.primary} />
              <Text style={styles.summaryButtonText}>View Summary</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          {showSummary && (
            <View style={styles.summarySection}>
              <View style={styles.summaryHeader}>
                <Sparkles size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Story Summary</Text>
              </View>
              
              <View style={styles.summaryContent}>
                <TextEffect
                  per="char"
                  preset="slide"
                  delay={0}
                  trigger={showSummary}
                  onAnimationComplete={() => setSummaryAnimationComplete(true)}
                  fontSize={16}
                  color={Colors.mutedText}
                  style={styles.summaryText}
                >
                  {getSummaryText()}
                </TextEffect>
              </View>
              
              <View style={styles.divider} />
            </View>
          )}
          
          <Text style={styles.sectionTitle}>Full Experience</Text>
          <Text style={styles.description}>
            Immerse yourself in this complete audio story experience. Listen as our AI narrator 
            brings every character to life with unique voices and atmospheric sound design.
          </Text>
          
          <Text style={styles.sectionTitle}>Characters & Voices</Text>
          <Text style={styles.description}>
            Meet a cast of unforgettable characters, each with their own unique 
            personalities, motivations, and secrets. Our advanced AI creates distinct 
            voices and speaking patterns for every character.
          </Text>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayPress}
            activeOpacity={0.8}
            testID="play-button"
          >
            <Play size={24} color="white" fill="white" />
            <Text style={styles.playButtonText}>Start Listening</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: Colors.text,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  metaText: {
    color: Colors.mutedText,
    fontSize: 14,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  summaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.softBlue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  summaryButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 20,
  },
  summarySection: {
    marginBottom: 8,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryContent: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  summaryText: {
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.mutedText,
    marginBottom: 24,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 40,
  },
  playButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});