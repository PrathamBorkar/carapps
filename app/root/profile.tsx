import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
const router=useRouter();
const Profile = () => {
  const [userData, setUserData] = useState(null);

  // Function to fetch data from server
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post("http://192.168.237.13:8082/userdata", { token });
      setUserData(response.data.data); // Assuming data is returned in response.data.data
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={24} color="black" />
        <FontAwesome name="edit" size={24} color="black" />
      </View>

      {/* Profile Section */}
      <View style={styles.profile}>
        <Image source={require('../../assets/images/pi.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileDetails}>{userData.mobile}</Text>
        <Text style={styles.profileDetails}>{userData.email}</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menu}>
        <MenuItem icon="chart-line" label="My Activity" />
        <MenuItem icon="car" label="Shortlisted vehicle" />
        <MenuItem icon="question-circle" label="Question and answer" />
        <MenuItem icon="car-side" label="My vehicles" />
        <MenuItem icon="cog" label="Profile settings" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
  style={styles.logoutButton}  
  onPress={async () => {
    await AsyncStorage.removeItem('token'); // Clear the token
    router.push('/auth/sing-in'); // Navigate to sign-in
  }}>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>

    </View>
  );
};

// MenuItem component for reusability
const MenuItem = ({ icon, label }) => {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <FontAwesome name={icon} size={24} color="#666" />
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      <FontAwesome name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#d3c4f3',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    marginVertical: 10,
  },
  profileDetails: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    elevation: 4, // For Android shadow
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#d3c4f3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
    marginVertical: 20,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Profile;