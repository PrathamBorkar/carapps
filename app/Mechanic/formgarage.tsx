import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from "expo-router";

const GarageForm = () => {
  const router = useRouter();
  const [garageName, setGarageName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [aadhaarCardNumber, setAadhaarCardNumber] = useState('');
  const [location, setLocation] = useState('');
  const [timings, setTimings] = useState('');
  const [servicesOffered, setServicesOffered] = useState('');
  const [image, setImage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');
  const [locate, setLocate] = useState('');

  const handleSubmit = async () => {
    if (
      !garageName ||
      !ownerName ||
      !contactNumber ||
      !aadhaarCardNumber ||
      !location ||
      !timings ||
      !locate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formdata = {
      garageName,
      ownerName,
      contactNumber,
      aadhaarCardNumber,
      location,
      timings,
      servicesOffered,
      image,
      contactEmail,
      description,
      locate,
    };

    console.log("Garage Form Data:", formdata);

    try {
      const response = await axios.post(
        "http://192.168.237.13:8082/createGarage",
        formdata
      );

      if (response.status === 201) {
        alert("Garage Added Successfully");
        router.push("/Mechanic/homegarage");
      } else {
        alert(`Failed to Add Garage: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Server did not respond. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Garage Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Garage Name"
        value={garageName}
        onChangeText={setGarageName}
      />
      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhaar Card Number"
        keyboardType="number-pad"
        value={aadhaarCardNumber}
        onChangeText={setAadhaarCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Timings"
        value={timings}
        onChangeText={setTimings}
      />
      <TextInput
        style={styles.input}
        placeholder="Services Offered"
        value={servicesOffered}
        onChangeText={setServicesOffered}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Email"
        value={contactEmail}
        onChangeText={setContactEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Garage coordinates on Google Maps"
        value={locate}
        onChangeText={setLocate}
      />

      <Button title="Submit" onPress={handleSubmit} color="#3498db" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

});

export default GarageForm;
