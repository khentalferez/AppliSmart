import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSignOut } from "./hooks/useSignOut";

export default function Home() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { handleSignOut, WebModal } = useSignOut(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return unsubscribe;
  }, []);

  const requireAuth = (path) => {
    if (user === undefined) {
      if (Platform.OS === "web") window.alert("Checking your login status...");
      else Alert.alert("Please Wait", "Checking your login status...");
      return;
    }

    if (!user) {
      if (Platform.OS === "web") {
        window.alert("You need to sign in your account first.");
        router.push("/authentication/auth");
      } else {
        Alert.alert(
          "Authentication Required",
          "You need to sign in your account first.",
          [{ text: "OK", onPress: () => router.push("/authentication/auth") }]
        );
      }
      return;
    }

    router.push(path);
  };

  if (user === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "white", marginTop: 10 }}>Checking session...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#E8DFCA", "#E8DFCA", "#19183B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>APPLISMART</Text>

      <Pressable
        style={styles.link}
        onPress={() => requireAuth("/goals")}
        accessibilityRole="button"
      >
        <Text style={styles.linkText}> My Appliances</Text>
      </Pressable>

      <Pressable
        style={styles.link}
        onPress={() => requireAuth("/goals/create")}
        accessibilityRole="button"
      >
        <Text style={styles.linkText}>Add New Appliances</Text>
      </Pressable>

      {!user && (
        <Link href="/authentication/auth" asChild>
          <Pressable style={styles.link} accessibilityRole="button">
            <Text style={styles.linkText}>Sign Up / Sign In</Text>
          </Pressable>
        </Link>
      )}

      {user && (
        <>
          {/* Use handleSignOut correctly */}
          <Pressable style={styles.link} onPress={handleSignOut} accessibilityRole="button">
            <Text style={styles.linkText}>Sign Out</Text>
          </Pressable>

          {/* Render web modal */}
          {WebModal}
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  title: {
    marginVertical: 40,
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  link: {
    marginVertical: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 8,
  },
  linkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
