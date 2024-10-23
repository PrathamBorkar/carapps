import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, FlatList, Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const ShowGarage = () => {
  const [garages, setGarages] = useState([]);
  const router = useRouter();
  const defaultImage = 'https://via.placeholder.com/200x150?text=No+Image+Available';

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/garages');
        console.log('Garage API Response:', response.data);
        setGarages(response.data.data); // Adjust according to your API response structure
      } catch (error) {
        console.error('Error fetching garages:', error);
      }
    };
    fetchGarages();
  }, []);

  const renderGarageItem = ({ item }) => {
    if (!item) {
      console.log('Item is undefined or null');
      return null;
    }

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image || defaultImage }}
          style={styles.garageImage}
          onError={() => setGarages((prev) =>
            prev.map((garage) =>
              garage._id === item._id ? { ...garage, image: defaultImage } : garage
            )
          )}
        />
        <View style={styles.garageInfo}>
          <Text style={styles.cardTitle}>{item.garageName}</Text>
          <Text style={styles.cardDetail}>Location: {item.location}</Text>
          <Text style={styles.cardDetail}>Services: {item.servicesOffered}</Text>
          <Text style={styles.cardDetail}>Timings: {item.timings}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => Linking.openURL(`tel:${item.contactNumber}`)}
            >
              <AntDesignIcon name="phone" size={16} color="#fff" />
              <Text style={styles.callText}>Call Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.locate)}`)}
            >
              <AntDesignIcon name="enviroment" size={16} color="#fff" />
              <Text style={styles.mapText}>Locate on Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <GestureHandlerRootView style={styles.leftArrowBox}>
        <TouchableOpacity style={styles.leftArrow} onPress={() => router.push("/")}>
          <AntDesignIcon name="arrowleft" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/Mechanic/formgarage")}>
        <Text style={styles.addButtonText}>Add Garage</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      <View style={styles.box}>
        <Text style={styles.boxText}>Find Garages Near You</Text>
      </View>

      <FlatList
        data={garages}
        renderItem={renderGarageItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text>No garages available</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  leftArrowBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  boxText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  garageImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  garageInfo: {
    padding: 15,
    flex: 1, // Take up remaining space
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  callButton: {
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  mapButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default ShowGarage;
