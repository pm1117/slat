import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "Completion">;

export default function CompletionScreen({ navigation }: Props) {
  const handleCheckResults = () => {
    // TODO: メイン画面（分析結果画面）に遷移
    console.log("Navigate to results");
    // 将来的には navigation.navigate("Main") などに変更
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <MaterialIcons name="check" size={80} color="#3498DB" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>登録完了！</Text>

        {/* Description */}
        <Text style={styles.description}>
          姿勢を分析しました。
          {"\n"}
          早速確認してみましょう。
        </Text>
      </View>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleCheckResults}>
          <Text style={styles.buttonText}>分析結果を確認する</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#EBF5FB",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
});
