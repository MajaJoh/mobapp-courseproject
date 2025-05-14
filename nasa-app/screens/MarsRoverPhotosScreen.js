import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import { Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";

const NASA_API_KEY = "Y1mbjx2BgRuuJCPfRtmegQAUTgQHepFAtcbiSTlK";

export default function RoverPhotosScreen() {
  const [roverData, setRoverData] = useState([]);
  const [filteredRoverData, setFilteredRoverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSol, setCustomSol] = useState("1000");
  const [selectedCamera, setSelectedCamera] = useState("");
  const [tempSelectedCamera, setTempSelectedCamera] = useState("");
  const [availableCameras, setAvailableCameras] = useState([]);

  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_500Medium,
  });

  useEffect(() => {
    fetchPhotosForSol(customSol);
  }, []);

  const fetchPhotosForSol = async (sol) => {
    console.log("Fetching photos for Sol:", sol);
    setLoading(true);
    const fetchedPhotos = [];

    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`
      );
      const data = await response.json();
      console.log(`Fetched ${data.photos.length} photos for Sol ${sol}`);
      if (data.photos.length > 0) {
        fetchedPhotos.push(...data.photos);
      } else {
        console.log(`No photos found for Sol ${sol}`);
      }
    } catch (error) {
      console.error(`Error fetching photos for Sol ${sol}:`, error);
    }

    setRoverData(fetchedPhotos);
    setFilteredRoverData(fetchedPhotos);
    extractAvailableOptions(fetchedPhotos);
    setLoading(false);
  };

  const extractAvailableOptions = (photos) => {
    const cameras = new Set();
    photos.forEach((photo) => {
      cameras.add(photo.camera.name);
    });
    setAvailableCameras(Array.from(cameras));
  };

  const handleFilter = () => {
    fetchPhotosForSol(customSol);
  };

  useEffect(() => {
    if (selectedCamera) {
      const filtered = roverData.filter(
        (photo) => photo.camera.name === selectedCamera
      );
      setFilteredRoverData(filtered);
    } else {
      setFilteredRoverData(roverData);
    }
  }, [selectedCamera, roverData]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.photoCard}>
        <Image
          source={{ uri: item.img_src }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  if (!fontsLoaded || (loading && roverData.length === 0)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <View style={styles.introductionBox}>
        <Image
          source={require("../assets/MarsRover.jpg")}
          style={styles.introImg}
        />
        <View style={styles.textBox}>
          <Text style={styles.title}>Mars Curiosity</Text>
          <Text style={styles.description}>
            Here you can find images taken by the Curiosity rover currently
            stationed on Mars.
          </Text>
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Text>Camera:</Text>
        <Picker
          selectedValue={tempSelectedCamera}
          onValueChange={(value) => setTempSelectedCamera(value)}
          style={{ height: 50 }}
        >
          <Picker.Item label="All" value="" />
          {availableCameras.map((cam) => (
            <Picker.Item key={cam} label={cam} value={cam} />
          ))}
        </Picker>

        <Text>Sol (Martian Day):</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
          keyboardType="numeric"
          value={customSol}
          onChangeText={(text) => setCustomSol(text)}
        />

        <Button
          title="Apply Filters"
          color="black"
          onPress={() => {
            setSelectedCamera(tempSelectedCamera);
            handleFilter();
          }}
        />
      </View>

      <FlatList
        data={filteredRoverData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
        ListEmptyComponent={
          <Text style={{ padding: 20 }}>No photos found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "white",
  },
  introductionBox: {
    width: "100%",
    height: 180,
    marginTop: 20,
    backgroundColor: "#242424",
    flexDirection: "row",
  },
  introImg: {
    width: 120,
    height: 140,
    marginLeft: 10,
    marginTop: 20,
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 13,

    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "white",
    fontFamily: "Inter_500Medium",
  },
  photoCard: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 4,
    padding: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
