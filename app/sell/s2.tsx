import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function VehicleDetailsForm({ setVehicleData }) {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [ownerNO, setOwnerNO] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [seats, setSeats] = useState('');
  const [askableprice, setAskableprice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedImage = response.assets[0].uri; // Access the first selected image's URI
        setImages([...images, selectedImage]);
      }
    });
  };

  const handleSubmit = () => {
    const vehicleData = {
      model,
      year,
      price,
      ownerNO,
      transmission,
      fuelType,
      seats,
      askableprice,
      description,
      images,
    };

    setVehicleData(vehicleData);
    setIsSubmitted(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Vehicle Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Model:</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Year:</Text>
          <TextInput
            style={styles.input}
            value={year}
            onChangeText={setYear}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Owner Number:</Text>
          <TextInput
            style={styles.input}
            value={ownerNO}
            onChangeText={setOwnerNO}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Transmission:</Text>
          <TextInput
            style={styles.input}
            value={transmission}
            onChangeText={setTransmission}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Fuel Type:</Text>
          <TextInput
            style={styles.input}
            value={fuelType}
            onChangeText={setFuelType}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Seats:</Text>
          <TextInput
            style={styles.input}
            value={seats}
            onChangeText={setSeats}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Askable Price:</Text>
          <TextInput
            style={styles.input}
            value={askableprice}
            onChangeText={setAskableprice}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Images:</Text>
          <TouchableOpacity onPress={handleImagePick}>
            <Text style={styles.input}>Pick Images</Text>
          </TouchableOpacity>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isSubmitted ? 'Saved Successfully' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3FB',
    borderRadius: 10,
    width: '80%',
    borderWidth: 2,
    borderColor: "#6f5ef1",
    padding: 20,
    marginTop: 20,
    alignSelf: "center"
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: ""
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});