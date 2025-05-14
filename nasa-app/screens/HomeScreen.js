import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/homeImg.jpg")}
        style={styles.backGroundImage}
        resizeMode="cover"
      >
        <Image source={require("../assets/nasalogo.png")} style={styles.logo} />
        <Text style={styles.introText}>
          "Hello and welcome to our NASA App! Text about the app comes here :D
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
          <Text style={styles.buttonText}>Mars Rover Photos</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logo: {
    width: 155,
    height: 155,
    marginBottom: 40,
  },
});
