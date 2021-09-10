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
    key: "1",
    title: "Easy Medical Care Access",
    description:
      "We've already done all the searching, reviewing and put our best minds and formulas to work so you can just pick and choose from the best medical providers and facilities that speak your language.",
    image: "https://image.flaticon.com/icons/png/512/2038/2038466.png",
  },
  {
    key: "2",
    title: "Shareable and Secure Medical Records",
    description:
      "It just takes 1 minute to fill out your CarpeMed Health Profile. Send it yourself or your trusted Travel Contacts, password protected and everything.",
    image: "https://image.flaticon.com/icons/png/512/1934/1934464.png",
  },
  {
    key: "3",
    title: "Safety In Your Itinerary",
    description:
      "Travel Confidently™ knowing that local emergency services are just a tap away. Your Travel Contacts will be immediately alerted whether they are with you or back home.",
    image: "https://image.flaticon.com/icons/png/512/3770/3770002.png",
  },
];

const Square = ({ scrollX }) => {
  // animation shape
  // shield if possible
  const midTransition = Animated.modulo(
    // percentage of space between slides
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = midTransition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = midTransition.interpolate({
    //x-axis
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
  const [nextButton, setNextButton] = React.useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      {/* <Square scrollX={scrollX} /> */}
      <Animated.FlatList
        onEndReached={() => setNextButton(!nextButton)}
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
            <View style={[styles.screenContainer, { width }]}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute:",
                  top: 75,
                }}
              >
                <Text style={styles.titleStyle}>{item.title}</Text>
                <Text style={styles.subTitleStyle}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
      {nextButton ? <Text> Youve reached then end </Text> : null}
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
  titleStyle: {
    color: "#00278B",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  subTitleStyle: {
    color: "#00278B",
    fontSize: 14,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    marginTop: 100,
  },
  screenContainer: {
    alignItems: "center",
    padding: 20,
  },
});
