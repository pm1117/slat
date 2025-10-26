import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<HomeStackParamList, "HomeMain">;

export default function HomeScreen({ navigation }: Props) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userName] = useState("Emma"); // TODO: 実際のユーザー名を取得

  useEffect(() => {
    checkFirstTimeHome();
  }, []);

  const checkFirstTimeHome = async () => {
    try {
      const hasSeenHomeOnboarding = await AsyncStorage.getItem(
        "@home_onboarding_completed"
      );
      if (hasSeenHomeOnboarding === null) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error("Error checking home onboarding:", error);
    }
  };

  const handleNextOnboarding = async () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      await AsyncStorage.setItem("@home_onboarding_completed", "true");
      setShowOnboarding(false);
    }
  };

  const handleSkipOnboarding = async () => {
    await AsyncStorage.setItem("@home_onboarding_completed", "true");
    setShowOnboarding(false);
  };

  const handleViewDetails = () => {
    navigation.navigate("AnalysisDetail");
  };

  const onboardingSteps = [
    {
      title: "最新の姿勢チェック",
      description: "ここで最新の分析結果を確認できます",
      position: { top: 160, left: 20, right: 20 },
    },
    {
      title: "詳細を表示",
      description: "このボタンで詳細な分析結果を見られます",
      position: { top: 350, right: 20 },
    },
    {
      title: "プラン管理",
      description: "サブスクリプションの管理はここから",
      position: { bottom: 200, left: 20, right: 20 },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons
              name="notifications-none"
              size={28}
              color="#2D3748"
            />
          </TouchableOpacity>
        </View>

        {/* Latest Posture Check Card */}
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <View style={styles.placeholderImage}>
              <MaterialIcons
                name="accessibility-new"
                size={100}
                color="#FFFFFF"
              />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Latest Posture Check</Text>
            <View style={styles.cardDetails}>
              <View style={styles.detailsLeft}>
                <Text style={styles.scoreText}>Score: 85%</Text>
                <Text style={styles.dateText}>Analyzed: Today</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={handleViewDetails}
              >
                <Text style={styles.detailsButtonText}>View Full Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Your Plan Section */}
        <View style={styles.planSection}>
          <Text style={styles.planTitle}>Your Plan</Text>
          <View style={styles.planContent}>
            <View style={styles.planDetails}>
              <Text style={styles.planName}>Premium Monthly</Text>
              <Text style={styles.planDate}>Next payment on 24 July, 2024</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.manageLink}>Manage Subscription</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planDivider} />
        </View>
      </ScrollView>

      {/* Onboarding Overlay */}
      {showOnboarding && (
        <>
          <View style={styles.overlay} />
          <View
            style={[
              styles.tooltipContainer,
              { ...onboardingSteps[onboardingStep].position },
            ]}
          >
            <View style={styles.tooltip}>
              <Text style={styles.tooltipTitle}>
                {onboardingSteps[onboardingStep].title}
              </Text>
              <Text style={styles.tooltipDescription}>
                {onboardingSteps[onboardingStep].description}
              </Text>
              <View style={styles.tooltipActions}>
                <TouchableOpacity onPress={handleSkipOnboarding}>
                  <Text style={styles.skipButton}>スキップ</Text>
                </TouchableOpacity>
                <View style={styles.dotsContainer}>
                  {[0, 1, 2].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        index === onboardingStep && styles.dotActive,
                      ]}
                    />
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNextOnboarding}
                >
                  <Text style={styles.nextButtonText}>
                    {onboardingStep === 2 ? "完了" : "次へ"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFB3BA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
  },
  notificationButton: {
    padding: 4,
  },
  card: {
    margin: 20,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#2C5F7C",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsLeft: {
    flex: 1,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
  },
  detailsButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  detailsButtonText: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  planSection: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  planTitle: {
    fontSize: 20,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    marginBottom: 16,
  },
  planContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planDetails: {
    flex: 1,
  },
  planName: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 4,
  },
  planDate: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
  },
  manageLink: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#3498DB",
  },
  planDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginTop: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  },
  tooltipContainer: {
    position: "absolute",
    zIndex: 1000,
  },
  tooltip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  tooltipTitle: {
    fontSize: 18,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  tooltipDescription: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
    marginBottom: 20,
    lineHeight: 20,
  },
  tooltipActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#718096",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
  },
  dotActive: {
    backgroundColor: "#3498DB",
    width: 24,
  },
  nextButton: {
    backgroundColor: "#3498DB",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
});
