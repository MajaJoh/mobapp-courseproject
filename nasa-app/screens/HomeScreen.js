import React from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/homeImg.jpg")}
        style={styles.backGroundImage}
        resizeMode="cover"
      >
        <Image source={require("../assets/nasalogo.png")} style={styles.logo} />
        <Button
          title="Astronomy Picture of The Day"
          onPress={() => navigation.navigate("APOD")}
        />
        <Button
          title="ISS Tracking"
          onPress={() => navigation.navigate("ISS Tracking")}
        />
        <Button
          title="Mars Rover Photos"
          onPress={() => navigation.navigate("Rover Photos")}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    paddingBottom: 50,
  },
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
  },
});
