import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CameraScreen() {
  const handleCapture = () => {
    // TODO: カメラ機能を実装
    console.log("Capture photo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.cameraText}>カメラビュー</Text>
        <Text style={styles.description}>舌の写真を撮影してください</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  cameraText: {
    fontSize: 24,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#B0B0B0",
  },
  controls: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#3498DB",
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3498DB",
  },
});
