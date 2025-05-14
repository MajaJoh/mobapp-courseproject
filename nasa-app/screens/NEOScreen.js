import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchNEOs } from '../services/neoService';

const getCardColor = (distance) => {
  if (distance < 0.01) return '#ffcccc';
  if (distance < 0.03) return '#fff3cd'; 
  return '#d4edda';
};

const auToKm = (au) => {
  return au * 149597870.7; 
};

const auToMiles = (au) => {
  return au * 92955807.3; 
};


const NEOList = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'date-min': '2025-05-01',
        'date-max': '2025-12-31',
        'dist-max': '0.05',
        body: 'Earth',
        diameter: true,
        fullname: true,
      };
      const data = await fetchNEOs(params);
      if (data) {
        const structuredData = data.data.map(item => {
          const obj = {};
          data.fields.forEach((field, index) => {
            obj[field] = item[index];
          });
          return obj;
        });
        setNeos(structuredData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
  const name = item.fullname;
  const date = item.cd;
  const distAU = parseFloat(item.dist);
  const distKm = auToKm(distAU);
  const distMiles = auToMiles(distAU);
  const velocity = item.v_rel;
  const diameter = item.diameter ? `${item.diameter} km` : 'Unknown';

  return (
    <View style={[styles.item, { backgroundColor: getCardColor(distAU) }]}>
      <Text style={styles.title}>🪐 {name}</Text>
      <Text>📅 Close Approach: {date}</Text>
      <Text>📏 Distance: {distAU.toFixed(4)} AU, {distKm.toFixed(0)} km </Text>
      <Text>🚀 Velocity: {velocity} km/s</Text>
      <Text>📐 Diameter: {diameter}</Text>
    </View>
  );
};


  if (loading) {
    return <Text style={styles.loadingText}>Loading near-Earth objects...</Text>;
  }

  return (
    <FlatList
      data={neos}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.des || index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loadingText: {
    marginTop: 50,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NEOList;

