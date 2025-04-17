import { StyleSheet, Image, Platform, View, Text } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import SignIn from "./sign-in";
import { useSession } from "./ctx";
import HomeScreen from "./(tabs)";

export default function SignInIndex() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return (
      <ThemedView>
        <Text> Loading .. </Text>
      </ThemedView>
    );
  }

  if (!session) {
    return (
      <ThemedView>
        <SignIn />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <HomeScreen />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
