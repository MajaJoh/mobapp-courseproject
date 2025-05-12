// components/NEOList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchNEOs } from '../services/neoService';

const NEOList = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'date-min': '2023-01-01',
        'date-max': '2023-12-31',
        'dist-max': '0.05',
        body: 'Earth',
      };
      const data = await fetchNEOs(params);
      if (data) {
        setNeos(data.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item[14]}</Text>
      <Text>Close Approach Date: {item[3]}</Text>
      <Text>Distance: {item[4]} AU</Text>
      <Text>Velocity: {item[7]} km/s</Text>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={neos}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default NEOList;
