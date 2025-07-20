import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { X, Sparkles, Wand2, BookOpen, Users } from "lucide-react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { TextEffect } from "@/components/ui/text-effect";
import Colors from "@/constants/colors";

interface AIStoryGeneratorProps {
  visible: boolean;
  onClose: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const AIStoryGenerator: React.FC<AIStoryGeneratorProps> = ({ visible, onClose }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showVoiceInput, setShowVoiceInput] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [showGenerationText, setShowGenerationText] = useState<boolean>(false);

  const genres = ["Adventure", "Mystery", "Sci-Fi", "Fantasy", "Romance", "Horror"];
  const lengths = ["Short (5-10 min)", "Medium (10-15 min)", "Long (15-20 min)"];
  
  const placeholders = [
    "A detective solving mysteries in space stations orbiting distant planets...",
    "A magical forest where time flows differently and ancient spirits whisper secrets...",
    "Two lovers separated by parallel dimensions who can only meet in dreams...",
    "An ancient artifact discovered in the depths of the ocean that holds the key to humanity's future...",
    "A journey to the center of the earth where a hidden civilization has thrived for millennia...",
    "A young inventor who creates a machine that can translate animal thoughts into human language...",
    "A librarian who discovers that certain books can transport readers into their stories...",
    "A chef whose recipes have magical properties that can heal both body and soul...",
  ];

  const generationSteps = [
    "Analyzing your story prompt...",
    "Creating compelling characters...",
    "Building the story world...",
    "Crafting the narrative arc...",
    "Adding dramatic elements...",
    "Finalizing your personalized story..."
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert("Missing Information", "Please enter a story prompt");
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);
    setShowGenerationText(true);
    
    try {
      // Simulate AI story generation with step-by-step updates
      for (let i = 0; i < generationSteps.length; i++) {
        setGenerationStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setIsGenerating(false);
      setShowGenerationText(false);
      Alert.alert(
        "Story Generated!", 
        "Your personalized story has been created and added to your timeline.",
        [{ text: "OK", onPress: onClose }]
      );
    } catch (error) {
      setIsGenerating(false);
      setShowGenerationText(false);
      Alert.alert("Error", "Failed to generate story. Please try again.");
    }
  };

  const handlePromptSubmit = (text: string) => {
    setPrompt(text);
  };

  const handleVoiceStart = () => {
    console.log("Voice recording started");
  };

  const handleVoiceStop = (duration: number) => {
    console.log("Voice recording stopped, duration:", duration);
    setShowVoiceInput(false);
  };

  const OptionButton = ({ 
    title, 
    isSelected, 
    onPress 
  }: { 
    title: string; 
    isSelected: boolean; 
    onPress: () => void; 
  }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = () => {
      scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    return (
      <AnimatedTouchableOpacity
        style={[
          styles.optionButton,
          isSelected && styles.selectedOption,
          animatedStyle
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Text style={[
          styles.optionText,
          isSelected && styles.selectedOptionText
        ]}>
          {title}
        </Text>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Sparkles size={24} color="white" />
              <Text style={styles.headerTitle}>AI Story Generator</Text>
            </View>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
              activeOpacity={0.7}
            >
              <X size={20} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {isGenerating && showGenerationText ? (
          <View style={styles.generationContainer}>
            <View style={styles.generationContent}>
              <Sparkles size={48} color={Colors.primary} />
              <Text style={styles.generationTitle}>Creating Your Story</Text>
              
              <View style={styles.generationStepContainer}>
                <TextEffect
                  key={generationStep}
                  per="char"
                  preset="slide"
                  delay={0}
                  trigger={true}
                  fontSize={18}
                  color={Colors.text}
                  style={styles.generationStepText}
                >
                  {generationSteps[generationStep]}
                </TextEffect>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${((generationStep + 1) / generationSteps.length) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(((generationStep + 1) / generationSteps.length) * 100)}%
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <BookOpen size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Story Prompt</Text>
              </View>
              
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={setPrompt}
                onSubmit={handlePromptSubmit}
                style={styles.promptInput}
              />
              
              <TouchableOpacity
                style={styles.voiceButton}
                onPress={() => setShowVoiceInput(!showVoiceInput)}
                activeOpacity={0.8}
              >
                <Text style={styles.voiceButtonText}>
                  {showVoiceInput ? "Hide Voice Input" : "Use Voice Input"}
                </Text>
              </TouchableOpacity>

              {showVoiceInput && (
                <AIVoiceInput
                  onStart={handleVoiceStart}
                  onStop={handleVoiceStop}
                />
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Wand2 size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Genre</Text>
              </View>
              <View style={styles.optionsGrid}>
                {genres.map((genre) => (
                  <OptionButton
                    key={genre}
                    title={genre}
                    isSelected={selectedGenre === genre}
                    onPress={() => setSelectedGenre(genre)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Users size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Story Length</Text>
              </View>
              <View style={styles.optionsGrid}>
                {lengths.map((length) => (
                  <OptionButton
                    key={length}
                    title={length}
                    isSelected={selectedLength === length}
                    onPress={() => setSelectedLength(length)}
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.generateButton, isGenerating && styles.generatingButton]}
              onPress={handleGenerate}
              disabled={isGenerating}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isGenerating ? [Colors.mutedText, Colors.mutedText] : [Colors.gradientStart, Colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.generateButtonGradient}
              >
                <Sparkles size={20} color="white" />
                <Text style={styles.generateButtonText}>
                  {isGenerating ? "Generating Story..." : "Generate Story"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 50,
  },
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  generationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  generationContent: {
    alignItems: "center",
    width: "100%",
  },
  generationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 20,
    marginBottom: 40,
  },
  generationStepContainer: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  generationStepText: {
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.mutedText,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginLeft: 8,
  },
  promptInput: {
    marginBottom: 12,
  },
  voiceButton: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.softBlue,
    borderRadius: 16,
    marginBottom: 12,
  },
  voiceButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.softBlue,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  generateButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 12,
    overflow: "hidden",
  },
  generatingButton: {
    opacity: 0.7,
  },
  generateButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
});