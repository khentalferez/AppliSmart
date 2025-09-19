// 📂 app/_layout.jsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff6ec4",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent", 
          borderTopWidth: 0,              
          elevation: 0,                   
          shadowOpacity: 0,               
          height: 60,
        },
        tabBarItemStyle: {
          borderRadius: 12, 
          margin: 6,        
        },
        tabBarActiveBackgroundColor:
          Platform.OS === "web"
            ? "rgba(186, 67, 223, 0.25)" 
            : "rgba(186, 67, 223, 0.4)", 
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* ✅ Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* ✅ About Tab */}
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />

      {/* 🚫 Hidden: Goals & subroutes */}
      <Tabs.Screen
        name="goals"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="goals/create"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="goals/updategoals"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      {/* 🚫 Hidden: Authentication */}
      <Tabs.Screen
        name="authentication"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
