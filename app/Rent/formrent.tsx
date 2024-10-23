import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import axios from "axios";
import { launchImageLibrary } from 'react-native-image-picker';

const FormRent = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [adhaarno, setAdhaarno] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [vin, setVin] = useState("");
  const [licenseno, setLicenseno] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    const errors = [];

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      errors.push("Please enter a valid name (letters only).");
    }
    if (!adhaarno || !/^\d{12}$/.test(adhaarno)) {
      errors.push("Please enter a valid Aadhaar number (12 digits).");
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      errors.push("Please enter a valid phone number (10 digits).");
    }
    if (!model) {
      errors.push("Car model cannot be empty.");
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      errors.push("Please enter a valid price (greater than zero).");
    }
    if (!vin) {
      errors.push("Vehicle Identification Number cannot be empty.");
    }
    if (!licenseno) {
      errors.push("License Number cannot be empty.");
    }
    if (!fueltype) {
      errors.push("Please select a fuel type.");
    }
    if (!image) {
      errors.push("Please select an image.");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateInput();
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    const formdata = {
      name,
      adhaarno,
      email,
      phone,
      model,
      price,
      vin,
      licenseno,
      fueltype,
      image,
    };

    console.log("Form Data:", formdata);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.237.13:8082/api/products",
        formdata
      );

      if (response.status === 201) {
        alert("Product Added Successfully");
        router.push("/Rent/homerent");
      } else {
        alert(`Failed to Add Product: ${response.data.message}`);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <GestureHandlerRootView style={styles.leftArrowBox}>
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => router.push("/Rent/formrent")}
          >
            <FeatherIcon name="arrow-left" size={24} color="#007AFF" />
            <Text style={styles.backText}>Rent Your Car</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>

        <View style={styles.titleBox}>
          <Text style={styles.title}>Owner's Information</Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            value={adhaarno}
            onChangeText={setAdhaarno}
            keyboardType="numeric"
            placeholder="Enter 12-digit Aadhaar number"
            maxLength={12}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Enter 10-digit phone number"
            maxLength={10}
          />

          <View style={styles.titleBox1}>
            <Text style={styles.title}>Vehicle Information</Text>
          </View>

          <Text style={styles.label}>Car Model</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="Enter car model"
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="Enter price per day"
          />

          <Text style={styles.label}>Vehicle Identification Number</Text>
          <TextInput
            style={styles.input}
            value={vin}
            onChangeText={setVin}
            placeholder="Enter VIN"
          />

          <Text style={styles.label}>License Number</Text>
          <TextInput
            style={styles.input}
            value={licenseno}
            onChangeText={setLicenseno}
            placeholder="Enter license number"
          />

          <Text style={styles.label}>Fuel Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fueltype}
              onValueChange={(itemValue) => setFueltype(itemValue)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Select Fuel Type" value="" />
              <Picker.Item label="Diesel" value="diesel" />
              <Picker.Item label="Petrol" value="petrol" />
              <Picker.Item label="CNG" value="cng" />
              <Picker.Item label="EV" value="ev" />
            </Picker>
          </View>

          <Text style={styles.label}>Vehicle Image</Text>
          <TouchableOpacity 
            style={styles.imagePickerButton} 
            onPress={handleImagePick}
          >
            <Text style={styles.imagePickerText}>Select Image</Text>
          </TouchableOpacity>
          {image && (
            <Image 
              source={{ uri: image }} 
              style={styles.selectedImage} 
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  titleBox: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  titleBox1: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  leftArrowBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  leftArrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 10,
    color: "#007AFF",
    fontSize: 18,
  },
  inputBox: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  imagePickerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#007AFF',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FormRent;