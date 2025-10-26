import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainTabParamList, HomeStackParamList } from "../types/navigation";
import HomeScreen from "../screens/main/HomeScreen";
import AnalysisDetailScreen from "../screens/main/AnalysisDetailScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen
        name="AnalysisDetail"
        component={AnalysisDetailScreen}
      />
    </HomeStack.Navigator>
  );
}

// Placeholder screens
function AnalysisScreen() {
  return null; // TODO: 実装予定
}

function ExercisesScreen() {
  return null; // TODO: 実装予定
}

function ProfileScreen() {
  return null; // TODO: 実装予定
}

export default function MainNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3498DB",
        tabBarInactiveTintColor: "#A0AEC0",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          backgroundColor: "#FFFFFF",
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Manrope_500Medium",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{
          tabBarLabel: "Analysis",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{
          tabBarLabel: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
