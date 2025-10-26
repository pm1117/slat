import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Intro">;

export default function IntroScreen({ navigation }: Props) {
  const handleStartAnalysis = () => {
    navigation.navigate("Personalize");
  };

  const handleLearnMore = () => {
    // TODO: もっと詳しく知るページへの遷移
    console.log("Learn more");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBackground}>
            <Image
              source={require("../../../assets/human.png")}
              style={styles.bodyIllustration}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>無料の姿勢分析</Text>

          {/* Description */}
          <Text style={styles.description}>
            あなたの姿勢に関するパーソナライズされたレポートを即座に受け取り、改善方法を学びましょう。
          </Text>

          {/* Features List */}
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}
              >
                <MaterialIcons
                  name="medical-services"
                  size={24}
                  color="#3498DB"
                />
              </View>
              <Text style={styles.featureText}>姿勢の問題を特定する</Text>
            </View>

            <View style={styles.featureItem}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}
              >
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#3498DB"
                />
              </View>
              <Text style={styles.featureText}>
                パーソナライズされた推奨事項を受け取る
              </Text>
            </View>

            <View style={styles.featureItem}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}
              >
                <FontAwesome6 name="arrow-trend-up" size={24} color="#3498DB" />
              </View>
              <Text style={styles.featureText}>
                より健康的な背中への旅を始める
              </Text>
            </View>
          </View>

          {/* Primary Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartAnalysis}
          >
            <Text style={styles.primaryButtonText}>
              早速姿勢を分析してみましょう
            </Text>
          </TouchableOpacity>

          {/* Secondary Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLearnMore}
          >
            <Text style={styles.secondaryButtonText}>もっと詳しく知る</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  illustrationContainer: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5cdae",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyIllustration: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresList: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
  },
  primaryButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  secondaryButton: {
    padding: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#3498DB",
  },
});
