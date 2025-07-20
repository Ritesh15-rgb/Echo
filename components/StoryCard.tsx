import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Clock, User, Heart } from "lucide-react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Colors from "@/constants/colors";

interface StoryCardProps {
  title: string;
  duration: string;
  author: string;
  imageUrl: string;
  onPress: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const StoryCard: React.FC<StoryCardProps> = ({
  title,
  duration,
  author,
  imageUrl,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  return (
    <AnimatedTouchableOpacity 
      style={[styles.container, animatedStyle]} 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
      </View>
      
      <View style={styles.playButtonContainer}>
        <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
          <Play size={16} color="white" fill="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={12} color={Colors.mutedText} />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <User size={12} color={Colors.mutedText} />
            <Text style={styles.metaText}>{author}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <Heart size={16} color={Colors.mutedText} />
      </TouchableOpacity>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    height: 160,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  playButtonContainer: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    padding: 16,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 22,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    color: Colors.mutedText,
    fontSize: 12,
    marginLeft: 4,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.softBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});