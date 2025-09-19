// 📂 app/goals/updategoals.jsx
import { useState } from "react";
import { StyleSheet, Text, TextInput, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGoals } from "../../hooks/useGoals";
import { useRouter, useLocalSearchParams } from "expo-router";

const UpdateGoals = () => {
  const { id, name: initialName = "", progress: initialProgress = 0 } = useLocalSearchParams();
  const [name, setName] = useState(initialName);
  const [progress, setProgress] = useState(String(initialProgress));
  const { updateGoal } = useGoals();
  const router = useRouter();

  if (!id) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safe}>
          <Text style={styles.title}>Update Appliances</Text>
          <Text style={styles.warning}>
            Please click Edit in your inserted Appliances.
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  const handleUpdate = async () => {
    if (!name.trim() || isNaN(progress)) return;
    await updateGoal(id, {
      name,
      progress: Number(progress),
    });
    router.replace("/goals");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>Update Appliances</Text>

        <TextInput
          style={styles.input}
          placeholder="Appliances Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          placeholderTextColor="#aaa"
          value={progress}
          onChangeText={setProgress}
          keyboardType="numeric"
        />

        <Pressable onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default UpdateGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1C2A", // ✅ same dark navy/charcoal as your Create screen
  },
  safe: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "95%",
    maxWidth: 400,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#121212", // ✅ dark button for consistency
    borderRadius: 10,
    width: "95%",
    maxWidth: 400,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  warning: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
});
