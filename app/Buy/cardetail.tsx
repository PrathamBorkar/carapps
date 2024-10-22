import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const CarDetailScreen = () => {
  const { carId } = useLocalSearchParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCarDetail = async () => {
    if (!carId) {
      setError('Car ID is missing');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching car details for ID:', carId);
      const response = await axios.get(
        `http://192.168.237.13:8082/cars/${carId}`,
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data) {
        throw new Error('No data received from server');
      }

      console.log('Car details received:', response.data);
      setCar(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching car details:', error);
      if (error.response) {
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Failed to load car details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetail();
  }, [carId]);

  const handleContactSeller = () => {
    if (car?.owner?.phoneNumber) {
      const phoneNumber = car.owner.phoneNumber;
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open dialer:', err)
      );
    }
  };

  const renderImage = () => {
    if (car?.images && Array.isArray(car.images) && car.images.length > 0) {
      return <Image source={{ uri: car.images[0] }} style={styles.image} />;
    } else if (typeof car?.images === 'string') {
      return <Image source={{ uri: car.images }} style={styles.image} />;
    } else {
      return (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name="car-outline" size={100} color="#cccccc" />
          <Text style={styles.placeholderText}>No image available</Text>
        </View>
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="red" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCarDetail}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="red" />
        <Text style={styles.errorText}>Car details not available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {renderImage()}
      <View style={styles.content}>
        <Text style={styles.title}>{car.model} • {car.year}</Text>

        <View style={styles.infrow}>
          <View style={styles.infItem}>
            <Ionicons name="calendar" size={20} color="black" />
            <Text>{car.year}</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="speedometer" size={20} color="black" />
            <Text>{car.km} km</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="water-outline" size={20} color="black" />
            <Text>{car.fuelType}</Text>
          </View>
          <View style={styles.infItem}>
            <Ionicons name="settings" size={20} color="black" />
            <Text>{car.transmission}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Ionicons name="pricetag-outline" size={24} color="#007bff" />
          <Text style={styles.price}>₹{car.askableprice} lakhs</Text>
        </View>

        <TouchableOpacity style={styles.makeOfferButton}>
          <Text style={styles.makeOfferText}>Make Offer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.calculateEmiButton}
          onPress={() => router.push('/root/EMI')}
        >
          <Ionicons name="calculator-outline" size={20} color="#007bff" />
          <Text style={styles.calculateEmiText}>Calculate EMI</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications and Features</Text>
          <View style={styles.specificationsContainer}>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.specTitle}>Engine</Text>
              <Text style={styles.specValue}>{car.engine || '1462 cc'}</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.specTitle}>Power</Text>
              <Text style={styles.specValue}>{car.power || '103.26 bhp'}</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.specTitle}>Mileage</Text>
              <Text style={styles.specValue}>{car.mileage || '16 kmpl'}</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.specTitle}>Seating Capacity</Text>
              <Text style={styles.specValue}>{car.seats} seats</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.specTitle}>No. of Owners</Text>
              <Text style={styles.specValue}>{car.ownerNo}</Text>
            </View>
            <View style={styles.specRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.specTitle}>Location</Text>
              <Text style={styles.specValue}>{car.location || 'Margao'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sellerSection}>
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerRow}>
              <Ionicons name="person-outline" size={20} color="#007bff" />
              <Text style={styles.sellerText}>
                {car.owner?.ownerName || 'Seller Name Not Available'}
              </Text>
            </View>
            {car.owner?.location && (
              <View style={styles.sellerRow}>
                <Ionicons name="location-outline" size={20} color="#007bff" />
                <Text style={styles.sellerText}>{car.owner.location}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.contactSellerButton}
            onPress={() => Linking.openURL(`https://wa.me/${car.owner.whatsappNumber}`)}
          >
            <Ionicons name="call-outline" size={24} color="#fff" />
            <Text style={styles.contactSellerText}>Contact Seller</Text>
          </TouchableOpacity>
        </View>

        {car.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{car.description}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
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
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  placeholderImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#cccccc',
    marginTop: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infrow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infItem: {
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 10,
  },
  makeOfferButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  makeOfferText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calculateEmiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  calculateEmiText: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 10,
    fontWeight: '600',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  specificationsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specTitle: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  specValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  sellerSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  sellerInfo: {
    marginBottom: 15,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  sellerText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  contactSellerButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  contactSellerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  }
});

export default CarDetailScreen;