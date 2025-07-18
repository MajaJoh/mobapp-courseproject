import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ApodScreen from "../screens/ApodScreen";
import ISSTrackScreen from "../screens/ISSTrackScreen";
import RoverPhotosScreen from "../screens/MarsRoverPhotosScreen";
import NEOScreen from "../screens/NEOScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="APOD" component={ApodScreen} />
        <Stack.Screen name="ISS Tracking" component={ISSTrackScreen} />
        <Stack.Screen name="Rover Photos" component={RoverPhotosScreen} />
        <Stack.Screen name="NEO" component={NEOScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
