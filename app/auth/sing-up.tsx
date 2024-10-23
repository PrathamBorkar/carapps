import React, { useState } from "react";
import { Image, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal,StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [nameVerify, setNameVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobileVerify, setMobileVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  const router = useRouter();

  const handleName = (text) => {
    setName(text);
    setNameVerify(text.length > 1);
  };

  const handleEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailVerify(emailRegex.test(text));
  };

  const handleMobile = (text) => {
    setMobile(text);
    const mobileRegex = /^[0-9]{10}$/;
    setMobileVerify(mobileRegex.test(text));
  };

  const handlePassword = (text) => {
    setPassword(text);
    setPasswordVerify(text.length >= 6);
  };

  const sendOtp = async () => {
    if (!nameVerify || !emailVerify || !mobileVerify || !passwordVerify) {
      setSuccessMessage("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch("http://192.168.237.13:8082/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("OTP sent successfully!");
        setShowOtpModal(true);
      } else {
        setSuccessMessage(data.error || "Failed to send OTP.");
      }
    } catch (error) {
      setSuccessMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setSuccessMessage("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch("http://192.168.237.13:8082/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("OTP verified successfully!");
        setShowOtpModal(false);
        registerUser();
      } else {
        setSuccessMessage(data.error || "Invalid OTP.");
      }
    } catch (error) {
      setSuccessMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch("http://192.168.237.13:8082/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        setSuccessMessage("User created successfully!");
        
        setTimeout(() => {
          router.push("/auth/sing-in");
        }, 2000);
      } else {
        setSuccessMessage(data.data || "Something went wrong.");
      }
    } catch (error) {
      setSuccessMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ width: "100%", height: 250, position: "relative" }}>
          <Image source={require("../../assets/images/signup-car.png")} style={{ width: "100%", height: 250 }} />
          <Text style={{ fontSize: 24, color: "black", fontWeight: "600", position: "absolute", bottom: 20, left: 20 }}>
            Create Your Account
          </Text>
        </View>

        <View style={{ padding: 20 }}>
  {/* Name Input */}
  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Name</Text>
  <TextInput
    placeholder="Enter name"
    value={name}
    onChangeText={handleName}
    style={{
      borderBottomWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 13,
      borderRadius: 10,
      backgroundColor:"#d8d7d9"
    }}
  />
  {!nameVerify && name.length > 0 && (
    <Text style={{ color: "red", marginBottom: 20 }}>Name should be at least 2 characters long.</Text>
  )}

  {/* Mobile Number Input */}
  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Mobile Number</Text>
  <TextInput
    placeholder="Enter mobile number"
    value={mobile}
    onChangeText={handleMobile}
    keyboardType="numeric"
    style={{
      borderBottomWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor:"#d8d7d9"

    }}
  />
  {!mobileVerify && mobile.length > 0 && (
    <Text style={{ color: "red", marginBottom: 20 }}>Mobile number must be exactly 10 digits long.</Text>
  )}

  {/* Email Input */}
  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Email</Text>
  <TextInput
    placeholder="Enter email"
    value={email}
    onChangeText={handleEmail}
    style={{
      borderBottomWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor:"#d8d7d9"

    }}
  />
  {!emailVerify && email.length > 0 && (
    <Text style={{ color: "red", marginBottom: 20 }}>Enter a valid email address.</Text>
  )}

  {/* Password Input */}
  <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Password</Text>
  <TextInput
    placeholder="Enter password"
    secureTextEntry={true}
    value={password}
    onChangeText={handlePassword}
    style={{
      borderBottomWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
      backgroundColor:"#d8d7d9"

    }}
  />
  {!passwordVerify && password.length > 0 && (
    <Text style={{ color: "red", marginBottom: 20 }}>Password should be at least 6 characters long.</Text>
  )}



          <TouchableOpacity
            onPress={sendOtp}
            style={{
              backgroundColor: "#1a75ff",
              padding: 15,
              borderRadius: 50,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />}

          {successMessage ? (
            <Text style={{ color: successMessage.includes("Success") ? "green" : "red", marginTop: 20, textAlign: "center" }}>
              {successMessage}
            </Text>
          ) : null}
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/auth/sing-in")}>
              <Text style={styles.signupLink}>Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showOtpModal}
        onRequestClose={() => setShowOtpModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Enter OTP</Text>
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 20,
                borderRadius: 5,
              }}
            />
            <TouchableOpacity
              onPress={verifyOtp}
              style={{
                backgroundColor: "#1a75ff",
                padding: 15,
                borderRadius: 50,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
    borderRadius:20,
  },
  signupText: {
    color: "gray",
  },
  signupLink: {
    color: "#1a75ff",
    fontWeight: "bold",
  },
})
export default SignUp;