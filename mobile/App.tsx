import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IntroScreen from "./src/screens/onboarding/IntroScreen";
import PersonalizeScreen from "./src/screens/onboarding/PersonalizeScreen";
import PhotoConfirmScreen from "./src/screens/onboarding/PhotoConfirmScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";
import CompletionScreen from "./src/screens/auth/CompletionScreen";
import {
  AuthStackParamList,
  OnboardingStackParamList,
} from "./src/types/navigation";

// スプラッシュスクリーンを自動で隠さないようにする
SplashScreen.preventAutoHideAsync();

type AppStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isFirstLaunch !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isFirstLaunch]);

  const checkFirstLaunch = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "@onboarding_completed"
      );
      setIsFirstLaunch(hasCompletedOnboarding === null);
      // setIsFirstLaunch(true); // Onboardingを表示する場合はこちらのみ追加
    } catch (error) {
      console.error("Error checking first launch:", error);
      setIsFirstLaunch(true);
    }
  };

  if (!fontsLoaded || isFirstLaunch === null) {
    return null;
  }

  const OnboardingNavigator = () => (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Intro" component={IntroScreen} />
      <OnboardingStack.Screen
        name="Personalize"
        component={PersonalizeScreen}
      />
      <OnboardingStack.Screen
        name="PhotoConfirm"
        component={PhotoConfirmScreen}
      />
    </OnboardingStack.Navigator>
  );

  const AuthNavigator = () => (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignUp"
    >
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "戻る",
        }}
      />
      <AuthStack.Screen name="Completion" component={CompletionScreen} />
    </AuthStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? "Onboarding" : "Auth"}
      >
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
