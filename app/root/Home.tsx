import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Type-safe navigation hook
import Swiper from 'react-native-swiper'; // Import Swiper for auto image slider
import sell from '../sell/s1';
import Buy from "../Buy/cardetail";
import BuyCar from '../Buy/b1';
import HomeRent from '../Rent/homerent';
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation(); // Hook to handle navigation
  const router=useRouter();
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        

        <View style={styles.logo}>
          <Text style={styles.logotext}>CarConnect</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Ionicons name="person-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image source={require('../../assets/images/banner.png')} style={styles.bannerphoto} />
      </View>

      {/* Slider */}
      <View style={styles.wrapper}>
        <Swiper
          autoplay={true} // Enables auto-sliding
          autoplayTimeout={4} // Set interval time in seconds
          showsPagination={false} // Disable dots
          loop={true} // Allows infinite loop
        >
          <Image source={require('../../assets/images/Curvv-ev.png')} style={styles.sliderImage} />
          <Image source={require('../../assets/images/image2.jpeg')} style={styles.sliderImage} />
          <Image source={require('../../assets/images/images3.jpeg')} style={styles.sliderImage} />
        </Swiper>
      </View>

      {/* Feature Grid */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/sell/s1')}>
          <Image source={require('../../assets/images/sell.png')} style={styles.gridIconFull} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/Buy/b1')}>
  <Image source={require('../../assets/images/BUY.png')} style={styles.gridIconFull} />
</TouchableOpacity>


        <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/Rent/homerent')}>
          <Image source={require('../../assets/images/rent.png')} style={styles.gridIconFull} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Service')}>
          <Image source={require('../../assets/images/service.png')} style={styles.gridIconFull} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 5,
    borderBottomEndRadius: 15,
    zIndex: 1,
  },
  logo: {
    letterSpacing: 10,
  },
  logotext: {
    fontWeight: "800",
    fontSize: 18,
    textAlign: "left",
  },
  
  bannerphoto: {
    flex: 1,
    paddingTop: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 100
    , // Adjust height for banner section
    backgroundColor: '#E0F7FA',
    overflow: 'hidden',
    borderBottomEndRadius: 20,
    resizeMode:'contain' // This keeps the image properly scaled
  },
  wrapper: {
    height: 200, // Adjust height to match the slider
    marginTop: 20, // Small space between banner and slider
  },
  sliderImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover', // Ensures the image in the swiper covers the container
    borderRadius: 10,
  },
  gridContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: "80%",
    alignSelf: 'center',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#f2f2f2',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  gridIconFull: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },
});