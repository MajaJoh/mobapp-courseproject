import React from "react";
import {
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Inter_500Medium_Italic } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Inter_500Medium_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.backGroundImage}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/homeImg.jpg")}
        style={styles.backGroundImage}
        resizeMode="cover"
      >
        <Image source={require("../assets/nasalogo.png")} style={styles.logo} />
        <Text style={styles.introText}>
          Welcome to AstroTrack! In this app you can view daily astronomy pictures with descriptions, track where the ISS currently is, discover Mars with pictures from the Curiosity Rover, and track near earth objects (asteroids, comets) that hopefully won't crash into earth and kill us all!
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("APOD")}
        >
          <Text style={styles.buttonText}>Astronomy Picture of The Day</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("ISS Tracking")}
        >
          <Text style={styles.buttonText}>ISS Tracking</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Rover Photos")}
        >
          <Text style={styles.buttonText}>Curiosity Rover Photos</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("NEO")}
        >
          <Text style={styles.buttonText}>Near Earth Objects</Text>
        </Pressable>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    height: 900,
    alignItems: "center",
    justifyContent: "top",
  },
  logo: {
    width: 300,
    height: 81,
    marginBottom: 40,
    marginTop: 50,
    opacity: 0.7,
    marginBottom: 100,
  },
  button: {
    width: 300,
    height: 60,
    backgroundColor: "#0a0913",
    opacity: 0.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter_500Medium_Italic",
  },
  introText: {
    fontSize: 16,
    marginLeft: 25,
    color: "white",
    fontFamily: "Inter_500Medium_Italic",
    marginBottom: 100,
  },
});
