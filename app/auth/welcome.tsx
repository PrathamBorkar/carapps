import { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useRouter } from "expo-router"; // Use expo-router for navigation

const { width, height } = Dimensions.get("window");

const onboarding = [
  {
    id: 1,
    image: require("../../assets/images/onboarding1.png"),
    title: "Welcome",
    description: "Comprehensive Car Management",
  },
  {
    id: 2,
    image: require("../../assets/images/onboarding2.png"),
    title: "Discover",
    description: "Your Ultimate Car Marketplace and Service Hub",
  },
  {
    id: 3,
    image: require("../../assets/images/onboarding3.png"),
    title: "Start Now",
    description: "Streamlined Car Ownership Experience",
  },
];

const welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const router = useRouter(); // Use router for navigation
  const swiperRef = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.replace('/auth/sing-in'); // Navigate to sign-in page on "Skip"
        }}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <SwiperFlatList
        index={activeIndex}
        ref={swiperRef} // Store reference to control the swiper
        showPagination
        paginationStyleItem={styles.dot}
        paginationActiveColor="#0286FF"
        paginationDefaultColor="#E2E8F0"
        onChangeIndex={({ index }) => setActiveIndex(index)} // Update the current index
        style={{ height: height * 0.75 }}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </SwiperFlatList>

      <TouchableOpacity
        onPress={() => {
          if (isLastSlide) {
            router.replace('/auth/sing-in'); // Navigate to sign-in page on the last slide
          } else {
            swiperRef.current.scrollToIndex({ index: activeIndex + 1 }); // Move to the next slide
            setActiveIndex((prev) => prev + 1); // Update state
          }
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isLastSlide ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  skipText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 5,
    borderRadius: 50,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    width,
    padding: 10,
  },
  image: {
    width: width * 0.9,
    height: height * 0.4,
  },
  titleContainer: {
    marginTop: 20,
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#858585",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    width: "90%",
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default welcome;