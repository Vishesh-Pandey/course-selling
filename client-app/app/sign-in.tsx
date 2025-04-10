import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function SignIn() {
  return (
    <View style={{ padding: 16 }}>
      <ThemedText type="title">Sign In</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <ThemedText type="link" style={styles.buttonText}>
          Sign In
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: "white",
  },
  button: {
    backgroundColor: "#0a7ea4",
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
  },
});
