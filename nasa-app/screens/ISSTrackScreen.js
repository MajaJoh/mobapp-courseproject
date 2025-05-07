import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from 'react-native-maps';

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
    fetch("http://api.open-notify.org/iss-now.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.iss_position) {
          const { latitude, longitude } = data.iss_position;
          setIssData(data);
          setRegion({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 10,
            longitudeDelta: 10,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ISS Data:", error);
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

  if (!issData) {
    return (
      <View style={styles.center}>
        <Text>Error loading data.</Text>
      </View>
    );
  }

  const { latitude, longitude } = issData.iss_position;

  return (
    <View style={styles.center}>
      <MapView
        style={styles.map}
        region={region}  
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          title={"ISS Location"}
          description={`Latitude: ${latitude}, Longitude: ${longitude}`}
        />
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
});
