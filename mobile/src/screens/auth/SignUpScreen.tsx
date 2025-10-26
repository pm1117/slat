import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Development Buildで有効化
// import * as AppleAuthentication from "expo-apple-authentication";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // TODO: Development Buildで有効化
  // const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false);

  // Google Sign In設定
  // TODO: Google Cloud Consoleで取得したClient IDに置き換えてください
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
  //   androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  //   webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   checkAppleSignInAvailability();
  // }, []);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     handleGoogleSignInSuccess(authentication);
  //   }
  // }, [response]);

  // const checkAppleSignInAvailability = async () => {
  //   const isAvailable = await AppleAuthentication.isAvailableAsync();
  //   setIsAppleSignInAvailable(isAvailable);
  // };

  const handleSignUp = async () => {
    // TODO: 実際のサインアップ処理
    if (!name || !email || !password) {
      Alert.alert("入力エラー", "すべての項目を入力してください。");
      return;
    }
    console.log("Sign up:", { name, email, password });

    // オンボーディング完了フラグを保存
    await AsyncStorage.setItem("@onboarding_completed", "true");

    // TODO: ここでバックエンドにデータを送信し、ログイン状態にする

    // 完了画面に遷移
    navigation.navigate("Completion");
  };

  // TODO: Development Buildで有効化
  const handleGoogleSignUp = async () => {
    Alert.alert(
      "準備中",
      "Google Sign Inは開発版ビルドで利用可能です。\n\n次のコマンドを実行してください:\nnpx expo run:ios"
    );
  };

  const handleAppleSignUp = async () => {
    Alert.alert(
      "準備中",
      "Apple Sign Inは開発版ビルドで利用可能です。\n\n次のコマンドを実行してください:\nnpx expo run:ios"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons name="arrow-back" size={24} color="#2D3748" />
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons
                name="meditation"
                size={48}
                color="#3498DB"
              />
            </View>

            <Text style={styles.title}>7日間無料トライアルを開始</Text>
            <Text style={styles.subtitle}>
              姿勢を改善して、腰痛を軽減しましょう。
              {"\n"}
              まずは7日間無料でお試しください。
            </Text>
          </View>

          {/* Input Fields */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>お名前</Text>
              <TextInput
                style={styles.input}
                placeholder="お名前を入力"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>メールアドレス</Text>
              <TextInput
                style={styles.input}
                placeholder="メールアドレスを入力"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>パスワード</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="パスワードを作成"
                  placeholderTextColor="#A0AEC0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#A0AEC0"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <MaterialIcons
              name="info-outline"
              size={20}
              color="#3498DB"
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              7日間の無料トライアル期間終了後も、自動で課金されることはありません。
              継続してご利用になりたい場合は、アプリ内でプランをお選びください。
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>
              無料トライアルを開始する
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>または</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Sign Up Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignUp}
            >
              <MaterialIcons name="login" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleSignUp}
            >
              <MaterialIcons name="apple" size={20} color="#000000" />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            続行することで、
            <Text style={styles.link}>利用規約</Text>
            および
            <Text style={styles.link}>プライバシーポリシー</Text>
            に同意したものとみなされます。
          </Text>

          {/* Login Link */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>
              既にアカウントをお持ちですか？{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>ログイン</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
  },
  eyeIcon: {
    padding: 16,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#EBF5FB",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#2C5282",
    lineHeight: 20,
  },
  signUpButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#A0AEC0",
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
    marginLeft: 8,
  },
  termsText: {
    fontSize: 12,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
  },
  link: {
    color: "#3498DB",
    textDecorationLine: "underline",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
  },
  loginLink: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#3498DB",
  },
});
