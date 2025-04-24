import { StyleSheet, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "./ctx";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function SignInIndex() {
  const { isLoading, session } = useSession();

  useEffect(() => {
    console.log("Sign in token changed");
  }, [session]);

  if (isLoading) {
    return (
      <ThemedView>
        <Text> Loading .. </Text>
      </ThemedView>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <Redirect href="/auth" />;
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
