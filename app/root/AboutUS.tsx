import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Us</Text>

      <Text style={styles.description}>
        Welcome to <Text style={styles.highlight}>CarConnect</Text>! We are a passionate team of developers working to transform the way car ownership, sales, and services are managed. 
        CarConnect is not just an app—it's a bridge connecting car owners, buyers, and local service providers, making everything from purchasing a car to scheduling services more efficient and seamless.
      </Text>

      <Text style={styles.subheading}>Meet Our Team</Text>
      
      {/* Team Section */}
      <View style={styles.teamSection}>
        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Sai Kunkolienkar</Text>
          <Text style={styles.memberRole}>Full-Stack Developer</Text>
        </View>

        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Pratham Borkar</Text>
          <Text style={styles.memberRole}>Mobile App Developer</Text>
        </View>

        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Soham Ghotge</Text>
          <Text style={styles.memberRole}>UI/UX Designer</Text>
        </View>
      </View>

      <Text style={styles.motivationHeading}>Our Motivation</Text>
      <Text style={styles.description}>
        The automotive industry is evolving rapidly, but we noticed a gap in the market for a dedicated platform that streamlines communication between car owners, buyers, and local service providers. Our mission is to close that gap by providing a simple, user-friendly interface where users can buy, sell, rent, and service vehicles—all in one place.
      </Text>

      <Text style={styles.description}>
        With <Text style={styles.highlight}>CarConnect</Text>, our goal is to simplify the process of managing car ownership and services, helping users make informed decisions and enjoy a hassle-free experience. Whether you're a car dealer, a buyer, or a service provider, CarConnect aims to bring all parties together and make your life easier.
      </Text>

      <Text style={styles.closing}>
        Together, we're driving innovation in the automotive space and building the future of car connectivity.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  subheading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2980b9',
    marginBottom: 20,
    textAlign: 'center',
  },
  teamSection: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  memberCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  motivationHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16a085',
    marginBottom: 10,
    textAlign: 'center',
  },
  highlight: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  closing: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
});

export default AboutUs;