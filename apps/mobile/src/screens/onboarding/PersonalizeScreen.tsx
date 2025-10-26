import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Personalize">;

type AreaOption = "首" | "肩" | "背中" | "腰";
type SymptomOption = "痛み" | "こり" | "しびれ" | "頭痛" | "";
type ActivityLevel = "座りがち" | "適度に活動" | "活発";

export default function PersonalizeScreen({ navigation }: Props) {
  const [goal, setGoal] = useState("");
  const [selectedArea, setSelectedArea] = useState<AreaOption>("首");
  const [symptoms, setSymptoms] = useState<Set<SymptomOption>>(new Set([""]));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("座りがち");

  const handleSymptomToggle = (symptom: SymptomOption) => {
    const newSymptoms = new Set(symptoms);
    if (newSymptoms.has(symptom)) {
      newSymptoms.delete(symptom);
    } else {
      newSymptoms.add(symptom);
    }
    setSymptoms(newSymptoms);
  };

  const handleNext = async () => {
    // Navigate to PhotoConfirm screen
    navigation.navigate("PhotoConfirm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#2D3748" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>あなたに合わせた体験を</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "33%" }]} />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          あなたに最適な姿勢改善プランを作成するために、いくつか質問にお答えください。
        </Text>

        {/* Goal Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            あなたの主な姿勢改善の目標は何ですか？
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="例：腰痛を減らして、姿勢を良くしたい"
            placeholderTextColor="#A0AEC0"
            value={goal}
            onChangeText={setGoal}
            multiline
          />
        </View>

        {/* Area of Concern */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            主に気になる部位はどこですか？
          </Text>
          {(["首", "肩", "背中", "腰"] as AreaOption[]).map((area) => (
            <TouchableOpacity
              key={area}
              style={[
                styles.radioOption,
                selectedArea === area && styles.selectedOption,
              ]}
              onPress={() => setSelectedArea(area)}
            >
              <View style={styles.radioCircle}>
                {selectedArea === area && (
                  <View style={styles.radioCircleSelected} />
                )}
              </View>
              <Text style={styles.optionText}>{area}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Symptoms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            どのような症状がありますか？（複数選択可）
          </Text>
          {(["痛み", "こり", "しびれ", "頭痛"] as SymptomOption[]).map(
            (symptom) => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.checkboxOption,
                  symptoms.has(symptom) && styles.selectedOption,
                ]}
                onPress={() => handleSymptomToggle(symptom)}
              >
                <View
                  style={[
                    styles.checkbox,
                    symptoms.has(symptom) && styles.checkboxSelected,
                  ]}
                >
                  {symptoms.has(symptom) && (
                    <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.optionText}>{symptom}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Activity Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            普段の活動量はどのくらいですか？
          </Text>
          {(
            [
              { label: "座りがち（ほとんど座っている）", value: "座りがち" },
              {
                label: "適度に活動（ある程度歩いたり運動する）",
                value: "適度に活動",
              },
              {
                label: "活発（定期的な運動や体を動かす仕事）",
                value: "活発",
              },
            ] as Array<{ label: string; value: ActivityLevel }>
          ).map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.radioOption,
                activityLevel === option.value && styles.selectedOption,
              ]}
              onPress={() => setActivityLevel(option.value)}
            >
              <View style={styles.radioCircle}>
                {activityLevel === option.value && (
                  <View style={styles.radioCircleSelected} />
                )}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>次へ</Text>
        </TouchableOpacity>
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
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3498DB",
  },
  description: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
    minHeight: 60,
    textAlignVertical: "top",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    marginBottom: 12,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: "#3498DB",
    backgroundColor: "#EBF5FB",
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3498DB",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxSelected: {
    borderColor: "#3498DB",
    backgroundColor: "#3498DB",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
});
