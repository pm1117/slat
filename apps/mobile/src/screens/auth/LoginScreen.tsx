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
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: ログイン処理を実装
    console.log("Login:", email, password);
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: ソーシャルログイン処理を実装
    console.log("Social login:", provider);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* ロゴエリア */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <MaterialCommunityIcons
                name="meditation"
                size={32}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.logoText}>SLAT</Text>
          </View>

          {/* フォームエリア */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or log in with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton]}
                onPress={() => handleSocialLogin("apple")}
              >
                <AntDesign name="apple" size={24} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("google")}
              >
                <AntDesign name="google" size={24} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("x")}
              >
                <FontAwesome6 name="x-twitter" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* 新規登録リンク */}
            <View style={styles.signUpLinkContainer}>
              <Text style={styles.signUpLinkText}>
                アカウントをお持ちでないですか？{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpLink}>新規登録</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 16,
    justifyContent: "center",
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3498DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoIconText: {
    fontSize: 28,
  },
  logoText: {
    fontSize: 32,
    fontFamily: "Manrope_800ExtraBold",
    color: "#3498DB",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    backgroundColor: "#EBF2F5",
    color: "#2D3748",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#3498DB",
  },
  loginButton: {
    height: 50,
    backgroundColor: "#3498DB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#A0AEC0",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  signUpLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signUpLinkText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
  },
  signUpLink: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#3498DB",
  },
});
