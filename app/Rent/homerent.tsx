import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, FlatList, Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const HomeRent = () => {
  const [cars, setCars] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const defaultImage = 'https://via.placeholder.com/200x150?text=No+Image+Available';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://192.168.237.13:8082/api/products');
        console.log('API Response:', response.data);
        setCars(response.data.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setErrorMessage(error.toString());
      }
    };
    fetchCars();
  }, []);

  const filterCarsByFuelType = (fuelType) => {
    setSelectedFuelType(fuelType);
  };

  const renderCarItem = ({ item }) => {
    if (!item) {
      console.log('Item is undefined or null');
      return null;
    }

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image || defaultImage }}
          style={styles.carImage}
          onError={() => setCars((prev) =>
            prev.map((car) =>
              car._id === item._id ? { ...car, image: defaultImage } : car
            )
          )}
        />
        <View style={styles.carInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardModel}>Model: {item.model}</Text>
          <Text style={styles.cardPrice}>Price: {item.price}</Text>
          <Text style={styles.cardFuelType}>Fuel Type: {item.fueltype}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => Linking.openURL(`https://wa.me/${item.phone}`)}
            >
              <FontAwesome name="whatsapp" size={16} color="#fff" />
              <Text style={styles.whatsappText}>Contact Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => router.push(`/rent/cardetails?id=${item._id}`)}
            >
              <AntDesignIcon name="infocirlceo" size={16} color="#fff" />
              <Text style={styles.detailsText}>More Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const filteredCars = selectedFuelType
    ? cars.filter((car) => car.fueltype.toLowerCase() === selectedFuelType.toLowerCase())
    : cars;

  return (
    <ScrollView style={styles.container}>
      <GestureHandlerRootView style={styles.leftArrowBox}>
        <TouchableOpacity style={styles.leftArrow} onPress={() => router.push("/")}>
          <FeatherIcon name="arrow-left" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>

      <GestureHandlerRootView style={styles.box}>
        <Text style={styles.title}>Want to rent your Car?</Text>
        <View style={styles.descriptionContainer}>
          <AntDesignIcon name="car" size={20} color="#007AFF" />
          <Text style={styles.description}>Rent your car at the best price</Text>
        </View>
        <TouchableOpacity style={styles.rentButton} onPress={() => router.push("/Rent/formrent")}>
          <Text style={styles.buttonText}>Rent your Car</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>

      <View style={styles.filterContainer}>
        {['CNG', 'EV', 'Diesel', 'Petrol'].map((fuelType) => (
          <TouchableOpacity
            key={fuelType}
            style={[
              styles.filterButton,
              selectedFuelType === fuelType && styles.activeFilterButton,
            ]}
            onPress={() => filterCarsByFuelType(fuelType)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFuelType === fuelType ? styles.activeFilterButtonText : styles.inactiveFilterButtonText
            ]}>
              {fuelType}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.filterButton,
            !selectedFuelType && styles.activeFilterButton,
          ]}
          onPress={() => filterCarsByFuelType(null)}
        >
          <Text style={[
            styles.filterButtonText,
            !selectedFuelType ? styles.activeFilterButtonText : styles.inactiveFilterButtonText
          ]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error fetching cars: {errorMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No cars available</Text>}
        />
      )}
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
  box: {
    marginTop: 60,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  rentButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 70,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  inactiveFilterButtonText: {
    color: '#666',
  },
  listContainer: {
    paddingTop: 20,
  },
  card: {
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
  carImage: {
    width: '100%',
    height: 200,
  },
  carInfo: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardModel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  cardFuelType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 5,
    marginTop: 20,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default HomeRent;