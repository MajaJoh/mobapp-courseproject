import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_300Light } from "@expo-google-fonts/inter/300Light";
import { useFonts } from "expo-font";

const NASA_API_KEY = "Y1mbjx2BgRuuJCPfRtmegQAUTgQHepFAtcbiSTlK";

export default function ApodScreen({ navigation }) {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_300Light,
  });

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setApodData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching APOD:", error);
        setLoading(false);
      });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!apodData) {
    return (
      <View style={styles.center}>
        <Text>Error loading data.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {apodData.media_type === "image" ? (
          <Image
            source={{ uri: apodData.url }}
            style={[styles.image, styles.shadows]}
            resizeMode="cover"
          />
        ) : (
          <WebView
            source={{ uri: apodData.url }}
            style={[styles.video, styles.shadows]}
            javaScriptEnabled
            domStorageEnabled
          />
        )}
        <Text style={styles.title}>{apodData.title}</Text>
        <Text style={styles.subtitle}>
          Image Credit:{" "}
          {apodData.copyright?.replace(/\n/g, " ") || "Public Domain (NASA)"}
        </Text>
        <Text style={styles.description}>{apodData.explanation}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 450,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#000",
  },
  shadows: {
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // Android
    elevation: 5,
  },
  title: {
    fontSize: 22,
    marginHorizontal: 3,
    marginBottom: 12,
    fontFamily: "Inter_600SemiBold",
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 3,
    marginBottom: 12,
    color: "dimgray",
    fontFamily: "Inter_600SemiBold",
  },

  description: {
    fontSize: 16,
    marginHorizontal: 3,
    marginBottom: 50,
    color: "gray",
    textAlign: "justify",
    fontFamily: "Inter_300Light",
  },
});
