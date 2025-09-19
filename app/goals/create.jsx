import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Pressable, Keyboard, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGoals } from "../../hooks/useGoals";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // ✅ import Picker

const brands = [
  "Samsung",
  "LG",
  "Whirlpool",
  "Panasonic",
  "Philips",
  "Electrolux",
  "Bosch",
  "Sharp",
];

const Create = () => {
  const [goal, setGoal] = useState("");
  const [brand, setBrand] = useState(brands[0]);
  const { createGoal, fetchGoals } = useGoals();
  const router = useRouter();

  // ✅ If coming from choose screen
  const { selected } = useLocalSearchParams();
  useEffect(() => {
    if (selected) setGoal(selected);
  }, [selected]);

  const handleSubmit = async () => {
    if (!goal.trim()) return;
    await createGoal({
      name: `${brand} ${goal}`, // save brand + appliance
      progress: 0,
    });
    setGoal("");
    setBrand(brands[0]);
    Keyboard.dismiss();
    await fetchGoals();
    router.push("/goals");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safe}>
        <Text style={styles.title}>APPLIANCES</Text>

        {/* ✅ Appliance Input */}
        <TextInput
          style={styles.input}
          placeholder="What do you want to BUY?"
          placeholderTextColor="#aaaaaa"
          value={goal}
          onChangeText={setGoal}
        />

        {/* ✅ Brand Picker (under the input) */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Select Brand</Text>
          <Picker
            selectedValue={brand}
            onValueChange={(itemValue) => setBrand(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
          >
            {brands.map((b, index) => (
              <Picker.Item key={index} label={b} value={b} />
            ))}
          </Picker>
        </View>

        {/* Add Button */}
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Add New Appliance</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F1C" },
  safe: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 40, textAlign: "center" },
  input: {
    width: "95%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  pickerWrapper: {
    width: "95%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    padding: 8,
  },
  picker: { width: "100%", height: 50 },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#1C1C28",
    borderRadius: 10,
    width: "95%",
    maxWidth: 400,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
});
