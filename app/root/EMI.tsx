import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';

const CarLoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure * 12;

    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    setEmi(Math.round(emi));
    setTotalInterest(Math.round(totalInterest));
    setTotalAmount(Math.round(totalAmount));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image source={{ uri: 'https://files.cholamandalam.com/mobile_view_20_14_8e1df86d47.webp' }} style={styles.image} />
      </View>
      <Text style={styles.title}>Car Loan EMI Calculator</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Loan amount</Text>
        <Text style={styles.value}>₹ {loanAmount.toLocaleString()}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={2000000}
          step={10000}
          value={loanAmount}
          onValueChange={(value) => setLoanAmount(value)}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Rate of interest (p.a)</Text>
        <Text style={styles.value}>{interestRate} %</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={15}
          step={0.1}
          value={interestRate}
          onValueChange={(value) => setInterestRate(value)}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Loan tenure (years)</Text>
        <Text style={styles.value}>{loanTenure} Yr</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={30}
          step={1}
          value={loanTenure}
          onValueChange={(value) => setLoanTenure(value)}
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.result}>Monthly EMI <Text style={styles.resultValue}>₹{emi.toLocaleString()}</Text></Text>
        <Text style={styles.result}>Principal amount <Text style={styles.resultValue}>₹{loanAmount.toLocaleString()}</Text></Text>
        <Text style={styles.result}>Total interest <Text style={styles.resultValue}>₹{totalInterest.toLocaleString()}</Text></Text>
        <Text style={styles.result}>Total amount <Text style={styles.resultValue}>₹{totalAmount.toLocaleString()}</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontWeight:'bold',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    backgroundColor: '#e6f9f0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
  resultContainer: {
    width: '100%',
  },
  result: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: 'cover',
    borderRadius:10,
     // Optional for better image fit
  },
  container1: {
    marginBottom:50,
    width: '100%',
    height: 100,
    justifyContent: 'center', // Center the image vertically
    alignItems: 'center', // Center the image horizontally
  },
});

export default CarLoanEMICalculator;