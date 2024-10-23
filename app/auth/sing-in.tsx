import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios"; // Import axios
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Googlesingin=()=>{
  
}


const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Initialize useRouter to handle navigation

  const onSignInPress = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill out both email and password.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("https://carback.vercel.app/login-user", {
        email: form.email,
        password: form.password,
      });

      if (response.data.status === "ok") {
        Alert.alert("Success", "Login successful!");
        await AsyncStorage.setItem("token", response.data.data);
        AsyncStorage.setItem("Isloggedin",JSON.stringify(true));
        router.push("/root/profile");
      } else {
        setErrorMessage(response.data.data || "Invalid credentials.");
      }
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message || JSON.stringify(error.response.data);
        setErrorMessage(`Server Error: ${errorMsg}`);
      } else if (error.request) {
        setErrorMessage("No response from server. Please check your network or server.");
        console.log("Error Request: ", error.request);
      } else {
        setErrorMessage(`Error: ${error.message}`);
      }
      console.error("Error details:", error);
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/images/signup-car.png")} style={styles.image} />
        <Text style={styles.welcomeText}>Welcome 👋</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Let's get started</Text>
          <Text style={styles.subHeaderText}>Sign up or log in to find out the best car for you</Text>
        </View>

        <View style={styles.inputField}>
          <Text>Email</Text>
          <TextInput
            placeholder="Enter email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputField}>
          <Text>Password</Text>
          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity style={styles.fp}>
          <Text>Forgot password? Click here</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#1a75ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onSignInPress}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}

        {errorMessage ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>{errorMessage}</Text>
        ) : null}
        <View style={styles.fp}><Text>Or</Text></View>
        <TouchableOpacity style={styles.but} onPress={() => console.log("Sign In with Google")}>
          <Ionicons name="logo-google" size={24} color="#fff" style={styles.l} />
          <Text style={styles.butText}>Login with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/auth/sing-up")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  formContainer: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeaderText: {
    textAlign: "center",
    color: "gray",
  },
  inputField: {
    marginVertical: 10,
    
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#1a75ff",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  fp: {
    marginTop: 10,
    alignItems: "center",
  },
  but: {
    backgroundColor: "#068f13",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  butText: {
    color: "white",
    marginLeft: 10,
 
  },
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
  l: {
    marginRight: 5,
  },
});

export default SignIn;