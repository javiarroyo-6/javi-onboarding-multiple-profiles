import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MultipleProfileTabs from "../screens/Onboarding/MultipleProfileTabs";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="OnboardingScreen">
      <RootStack.Screen name="Profiles" component={MultipleProfileTabs} />
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
