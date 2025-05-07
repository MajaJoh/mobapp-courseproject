import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

const NASA_API_KEY = "Y1mbjx2BgRuuJCPfRtmegQAUTgQHepFAtcbiSTlK";

export default function RoverPhotosScreen() {
  const [roverData, setRoverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sol, setSol] = useState(1000); // simulate pagination by changing sol
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    if (loadingMore || endReached) return;

    setLoadingMore(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`
      );
      const data = await response.json();

      if (data.photos.length === 0) {
        setEndReached(true);
      } else {
        setRoverData((prev) => [...prev, ...data.photos.slice(0, 25)]);
        setSol((prevSol) => prevSol + 1);
      }
    } catch (error) {
      console.error("Error fetching Rover Photos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.photoCard}>
      <Image
        source={{ uri: item.img_src }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  if (loading && roverData.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={roverData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={styles.container}
      onEndReached={fetchPhotos}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 8,
    backgroundColor: "#fff",
  },
  photoCard: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
