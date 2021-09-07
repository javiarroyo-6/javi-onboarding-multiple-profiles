import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");

// make sure to confirm images in order to store them, cache, deliver
// confirm onboarding before adding contained styles to clean up code
// CarpeMed logo shield instead of square
// Write plan for onboarding process to pitch to ken
// navigation tree for successful and failed sign up
// send user to Explore Tab

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  // one more screen
  {
    key: "3",
    title: "Safety In Your Itinerary",
    description:
      "Press 'SOS' to call local emergency services and immediately notify your Travel Contacts.",
    image: "https://image.flaticon.com/icons/png/512/2038/2038466.png",
  },
  {
    key: "2",
    title: "Easy Medical Care Access",
    description:
      "Our '2 Taps and Book' appointment booking process keeps it simple (where available)",
    image: "https://image.flaticon.com/icons/png/512/1934/1934464.png",
  },
  {
    key: "1",
    title: "Shareable and Secure Medical Records",
    description:
      "Securely share your medical preferences by uploading an existing medical directive or creating one by answering 6 yes or no questions.",
    image: "https://image.flaticon.com/icons/png/512/3770/3770002.png",
  },
];

const Square = ({ scrollX }) => {
  // shield if possible
  const midTransition = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = midTransition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = midTransition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#00278B",
        borderRadius: 50,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", flexDirection: "row", bottom: 100 }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 15,
              width: 15,
              borderRadius: 7,
              backgroundColor: "#fff",
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: "#FFCDB1",
        },
      ]}
    />
  );
};

function OnboardingScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center", padding: 20 }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "800",
                    fontSize: 24,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "white", fontSize: 15 }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
