import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import OwnerInfoForm from './userd';
import VehicleDetailsForm from './s2';
import axios from 'axios';

export default function Sell() {
  const router = useRouter();

  const [regNumber, setRegNumber] = useState('');
  const [vehicleData, setVehicleData] = useState({});
  const [ownerData, setOwnerData] = useState({});

  const handleSubmit = async () => {
    const formData = {
      regno: regNumber,
      model: vehicleData.model,
      year: vehicleData.year,
      price: vehicleData.price,
      ownerNO: vehicleData.ownerNO,
      transmission: vehicleData.transmission,
      fuelType: vehicleData.fuelType,
      seats: vehicleData.seats,
      askableprice: vehicleData.askableprice,
      description: vehicleData.description,
      images: vehicleData.images,
      owner: {
        ownerName: ownerData.ownerName,
        adhaarNumber: ownerData.adhaarNumber,
        whatsappNumber: ownerData.whatsappNumber,
        ownerComments: ownerData.ownerComments,
      },
    };

    try {
      const response = await axios.post('http://192.168.237.13:8082/add-car', formData);

      if (response.status === 200) {
        alert(response.data.message || 'Car details submitted successfully /n navigating to Home');
        router.push('/root/Home');

      } else {
        alert(response.data.message || 'Failed to submit car details');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/back.png')}
        style={styles.backimage}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Turn keys into cars{'\n'}Sell your car at best price
          </Text>
        </View>
      </ImageBackground>

      {/* Car Registration Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter your car registration</Text>
        <TextInput
          style={styles.input}
          placeholder="Reg.no.(GA 08 E 0171)"
          value={regNumber}
          onChangeText={setRegNumber}
        />
      </View>

      {/* Pass setVehicleData and setOwnerData to child components */}
      <VehicleDetailsForm setVehicleData={setVehicleData} />
      <OwnerInfoForm setOwnerData={setOwnerData} />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backimage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  banner: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252F40',
    marginLeft: 4,
    marginBottom: 2,
    textAlign: 'left',
    alignSelf: "flex-end"
  },
  inputContainer: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 20,
    backgroundColor: '#d6eef9',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderColor: '#6f5ef1',
    borderWidth: 2,
  },
  inputLabel: {
    fontSize: 16,
    color: '#252F40',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    width: 300,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#f4750d',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
    width: 300,
    alignSelf: "center",
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
  },
});