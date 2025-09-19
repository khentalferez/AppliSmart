import { StyleSheet, Text, Pressable, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const appliances = [
"Refrigerator",
 "Washing Machine", 
 "Microwave", "Air Conditioner",
  "Television",
  "Dishwasher", 
 "Vacuum Cleaner",
 "Water Dispenser", 

];

const ChooseAppliance = () => {
  const router = useRouter();

  const handleSelect = (item) => {
    // ✅ Navigate back to create with selected appliance
    router.push({
      pathname: "/goals/create",
      params: { selected: item },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose an Appliance</Text>

      <FlatList
        data={appliances}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default ChooseAppliance;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F1C", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 20, textAlign: "center" },
  list: { paddingBottom: 20 },
  item: {
    backgroundColor: "#2D1B69",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  itemText: { color: "white", fontSize: 18, fontWeight: "500" },
});
