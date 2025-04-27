import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/nasalogo.png")}
        style={styles.logo}
      />
      <Button title="Astronomy Picture of The Day" onPress={() => navigation.navigate('APOD')} />
    </View>
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
