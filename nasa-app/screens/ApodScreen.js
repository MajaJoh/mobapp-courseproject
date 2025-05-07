import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

const NASA_API_KEY = "Y1mbjx2BgRuuJCPfRtmegQAUTgQHepFAtcbiSTlK";

export default function ApodScreen({ navigation }) {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{apodData.title}</Text>
        <Text style={styles.subtitle}>
          Image Credit:
          {apodData.copyright?.replace(/\n/g, " ") || "Public Domain (NASA)"}
        </Text>
        {apodData.media_type === "image" ? (
          <Image
            source={{ uri: apodData.url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text>This is a video. Visit: {apodData.url}</Text>
        )}
        <Text style={styles.description}>{apodData.explanation}</Text>
      </ScrollView>
    </View>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
});
