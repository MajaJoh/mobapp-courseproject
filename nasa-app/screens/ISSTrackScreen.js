import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";

export default function ISSTrackScreen() {
  const [issData, setIssData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  useEffect(() => {
    const fetchIssData = () => {
      fetch("http://api.open-notify.org/iss-now.json")
        .then((response) => response.json())
        .then((data) => {
          if (data.iss_position) {
            const { latitude, longitude } = data.iss_position;
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);
            setIssData({ latitude: lat, longitude: lon });
            setRegion({
              latitude: lat,
              longitude: lon,
              latitudeDelta: 10,
              longitudeDelta: 10,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching ISS Data:", error);
        })
        .finally(() => setLoading(false));
    };
    const intervalId = setInterval(fetchIssData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!issData) {
    return (
      <View style={styles.center}>
        <Text>Error loading data.</Text>
      </View>
    );
  }

  const { latitude, longitude } = issData;

  const renderCircles = () => {
    const circles = [
      {
        radius: 2000000,
        stroke: "rgba(255,0,0,0.8)",
        fill: "rgba(255, 0, 0, 0.06)",
      },
      { radius: 80000, stroke: "rgba(0, 0, 0, 0.8)", fill: "transparent" },
      { radius: 400000, stroke: "rgba(0, 0, 0, 0.8)", fill: "transparent" },
      { radius: 900000, stroke: "rgba(0, 0, 0, 0.8)", fill: "transparent" },
    ];

    return circles.map((circle, index) => (
      <Circle
        key={index}
        center={{ latitude, longitude }}
        radius={circle.radius}
        strokeColor={circle.stroke}
        fillColor={circle.fill}
      />
    ));
  };

  return (
    <View style={styles.center}>
      <MapView style={styles.map} mapType="terrain">
        <Marker
          coordinate={{ latitude, longitude }}
          title="ISS Location"
          description={`Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`}
        >
          <Image source={require("../assets/ISS.png")} style={styles.image} />
        </Marker>
        {renderCircles()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: 50,
    height: 50,
  },
});
