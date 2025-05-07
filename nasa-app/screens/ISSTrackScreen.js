import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

export default function ISSTrackScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  logo: {
    width: 155,
    height: 155,
    marginBottom: 40,
  },
});
