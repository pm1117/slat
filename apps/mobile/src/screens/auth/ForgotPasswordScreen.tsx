import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // TODO: パスワードリセット処理を実装
    console.log("Reset password for:", email);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>パスワード再設定</Text>
            <Text style={styles.description}>
              登録されているメールアドレスを入力してください。{"\n"}
              パスワード再設定用のリンクをお送りします。
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>メールアドレス</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.submitButtonText}>送信</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>ログイン画面に戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope_700Bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#7F8C8D",
    lineHeight: 24,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2C3E50",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    backgroundColor: "#F8F9FA",
  },
  submitButton: {
    height: 50,
    backgroundColor: "#3498DB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  backButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#3498DB",
  },
});
