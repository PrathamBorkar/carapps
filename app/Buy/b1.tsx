import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CarListingScreen = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://192.168.237.13:8082/cars', {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      console.log('Cars data received:', response.data);
      setCars(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCars();
  }, []);

  const handleCarPress = (carId) => {
    console.log('Navigating to car detail with ID:', carId);
    router.push({
      pathname: '/Buy/cardetail',
      params: { carId }
    });
  };

  const renderCarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => handleCarPress(item._id)}
    >
      {item.images && item.images[0] ? (
        <Image 
          source={{ uri: item.images[0] }} 
          style={styles.carImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.carImage, styles.placeholderImage]}>
          <Ionicons name="car-outline" size={50} color="#cccccc" />
        </View>
      )}
      <View style={styles.carInfoContainer}>
        <View style={styles.carInfo}>
          <Text style={styles.carModel}>{item.model}</Text>
          <Text style={styles.carYear}>{item.year}</Text>
          <Text style={styles.carDetails}>
            {item.km} km • {item.transmission}
          </Text>
          <Text style={styles.carDetails}>
            {item.fuelType} • {item.ownerNo} owner
          </Text>
          <Text style={styles.price}>₹{item.askableprice} lakhs</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCarPress(item._id)}
          >
            <Text style={styles.buttonText}>GET SELLER DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="red" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCars}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BUY CARS</Text>
      </View>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={50} color="#cccccc" />
            <Text style={styles.emptyText}>No cars available</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {
    padding: 16,
  },
  carCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carImage: {
    width: '100%',
    height: 180,
  },
  placeholderImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carInfoContainer: {
    padding: 16,
  },
  carInfo: {
    marginBottom: 10,
  },
  carModel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  carYear: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  carDetails: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  price: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#6fa6ed',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heartIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default CarListingScreen;