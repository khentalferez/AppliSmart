// 📂 app/goals/_layout.jsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { GoalsProvider } from "../../context/GoalsContext";

export default function GoalsLayout() {
  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFD369", // bright yellow for active
          tabBarInactiveTintColor: "#EEEEEE", // light gray
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#2E0249", // ✅ unique deep purple background
            borderTopWidth: 0,
            elevation: 10,
            shadowOpacity: 0.2,
            height: 65,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          tabBarItemStyle: {
            borderRadius: 12,
            margin: 6,
          },
          tabBarActiveBackgroundColor:
            Platform.OS === "web"
              ? "rgba(255, 211, 105, 0.15)" // softer highlight on web
              : "rgba(255, 211, 105, 0.25)", // mobile highlight
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        {/* ✅ Goals Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Your Appliances",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        {/* ✅ Create Goal */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Add Appliances",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />

        {/* ✅ Update Goal */}
        <Tabs.Screen
          name="updategoals"
          options={{
            title: "Update Appliances",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  );
}
