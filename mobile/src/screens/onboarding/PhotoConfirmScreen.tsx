import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  Modal,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<OnboardingStackParamList, "PhotoConfirm">;

export default function PhotoConfirmScreen({ navigation }: Props) {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [sideImage, setSideImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageType, setCurrentImageType] = useState<
    "front" | "side" | null
  >(null);

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const requestPermissions = async (type: "camera" | "gallery") => {
    if (type === "camera") {
      const permission = await ImagePicker.getCameraPermissionsAsync();

      if (permission.status === "undetermined") {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        if (result.status === "denied") {
          // ユーザーが拒否した直後
          Alert.alert(
            "カメラの権限が必要です",
            "姿勢分析のために写真を撮影する必要があります。\n\n設定からカメラへのアクセスを許可してください。",
            [
              { text: "後で", style: "cancel" },
              {
                text: "設定を開く",
                onPress: openSettings,
              },
            ]
          );
          return false;
        }
        return result.status === "granted";
      }

      if (permission.status === "denied") {
        // 既に拒否されている場合
        return new Promise((resolve) => {
          Alert.alert(
            "カメラの権限がオフになっています",
            "このアプリでカメラを使用するには、設定でカメラへのアクセスを許可する必要があります。\n\n【設定方法】\n1. 設定アプリを開く\n2. 「slat」を選択\n3. 「カメラ」をオンにする",
            [
              {
                text: "キャンセル",
                style: "cancel",
                onPress: () => resolve(false),
              },
              {
                text: "設定を開く",
                onPress: () => {
                  openSettings();
                  resolve(false);
                },
              },
            ]
          );
        });
      }

      return permission.status === "granted";
    } else {
      const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (permission.status === "undetermined") {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.status === "denied") {
          // ユーザーが拒否した直後
          Alert.alert(
            "フォトライブラリの権限が必要です",
            "姿勢分析のために写真を選択する必要があります。\n\n設定からフォトライブラリへのアクセスを許可してください。",
            [
              { text: "後で", style: "cancel" },
              {
                text: "設定を開く",
                onPress: openSettings,
              },
            ]
          );
          return false;
        }
        return result.status === "granted";
      }

      if (permission.status === "denied") {
        // 既に拒否されている場合
        return new Promise((resolve) => {
          Alert.alert(
            "フォトライブラリの権限がオフになっています",
            "このアプリでフォトライブラリを使用するには、設定でフォトへのアクセスを許可する必要があります。\n\n【設定方法】\n1. 設定アプリを開く\n2. 「slat」を選択\n3. 「写真」を「すべての写真へのアクセスを許可」または「選択した写真」に設定",
            [
              {
                text: "キャンセル",
                style: "cancel",
                onPress: () => resolve(false),
              },
              {
                text: "設定を開く",
                onPress: () => {
                  openSettings();
                  resolve(false);
                },
              },
            ]
          );
        });
      }

      return permission.status === "granted";
    }
  };

  const handleImagePress = (type: "front" | "side") => {
    setCurrentImageType(type);
    setShowModal(true);
  };

  const pickImageFromCamera = async () => {
    setShowModal(false);

    // モーダルのアニメーションが完了するまで待つ
    await new Promise((resolve) => setTimeout(resolve, 300));

    const hasPermission = await requestPermissions("camera");

    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;

        if (currentImageType === "front") {
          setFrontImage(imageUri);
        } else if (currentImageType === "side") {
          setSideImage(imageUri);
        }
      }
    } catch (error) {
      Alert.alert("エラー", `写真の撮影中にエラーが発生しました。\n\n${error}`);
    }
  };

  const pickImageFromGallery = async () => {
    // モーダルを閉じる
    setShowModal(false);

    // モーダルのアニメーションが完了するまで待つ
    await new Promise((resolve) => setTimeout(resolve, 300));

    const hasPermission = await requestPermissions("gallery");

    if (!hasPermission) {
      console.log("Permission denied, returning");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;

        if (currentImageType === "front") {
          setFrontImage(imageUri);
          console.log("Front image set");
        } else if (currentImageType === "side") {
          setSideImage(imageUri);
          console.log("Side image set");
        }
      } else {
        console.log("Result canceled or no assets. canceled:", result.canceled);
      }
    } catch (error) {
      Alert.alert("エラー", `画像の選択中にエラーが発生しました。\n\n${error}`);
    }
  };

  const handleRetake = () => {
    setFrontImage(null);
    setSideImage(null);
  };

  const handleNext = async () => {
    // Save that onboarding is completed
    // await AsyncStorage.setItem("@onboarding_completed", "true");
    // TODO: 画像をアップロードしてAuth画面へ遷移
    // @ts-ignore - navigate to parent navigator
    // navigation.navigate("Auth");
    // SignUp画面へ遷移
    navigation.navigate("SignUp");
  };

  const isNextButtonEnabled = frontImage !== null && sideImage !== null;

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
          <Text style={styles.headerTitle}>写真の確認</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "66%" }]} />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          撮影した写真が鮮明に写っているか確認してください。
        </Text>

        {/* Front Image */}
        <View style={styles.imageSection}>
          <Text style={styles.imageLabel}>正面</Text>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImagePress("front")}
          >
            {frontImage ? (
              <Image source={{ uri: frontImage }} style={styles.image} />
            ) : (
              <View style={styles.emptyImageContainer}>
                <MaterialIcons name="camera-alt" size={48} color="#CBD5E0" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Side Image */}
        <View style={styles.imageSection}>
          <Text style={styles.imageLabel}>側面</Text>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImagePress("side")}
          >
            {sideImage ? (
              <Image source={{ uri: sideImage }} style={styles.image} />
            ) : (
              <View style={styles.emptyImageContainer}>
                <MaterialIcons name="camera-alt" size={48} color="#CBD5E0" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isNextButtonEnabled && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!isNextButtonEnabled}
        >
          <Text
            style={[
              styles.nextButtonText,
              !isNextButtonEnabled && styles.nextButtonTextDisabled,
            ]}
          >
            次へ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Text style={styles.retakeButtonText}>撮り直し</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Camera/Gallery Selection */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>写真を選択</Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalCloseButton}
              >
                <MaterialIcons name="close" size={24} color="#2D3748" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={pickImageFromCamera}
            >
              <MaterialIcons name="camera-alt" size={24} color="#3498DB" />
              <Text style={styles.modalOptionText}>カメラで撮影</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={pickImageFromGallery}
            >
              <MaterialIcons name="photo-library" size={24} color="#3498DB" />
              <Text style={styles.modalOptionText}>ギャラリーから選択</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
    paddingBottom: 40,
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
  imageSection: {
    marginBottom: 24,
  },
  imageLabel: {
    fontSize: 16,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 12,
  },
  imageContainer: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F7FAFC",
  },
  emptyImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5cdae",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nextButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  nextButtonDisabled: {
    backgroundColor: "#E2E8F0",
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  nextButtonTextDisabled: {
    color: "#A0AEC0",
  },
  retakeButton: {
    backgroundColor: "#F7FAFC",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  retakeButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F7FAFC",
    marginBottom: 12,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2D3748",
    marginLeft: 16,
  },
});
