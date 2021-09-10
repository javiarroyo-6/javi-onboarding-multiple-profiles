import React from "react";
import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./routes/RootStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
