import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ResultsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>分析結果</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📊</Text>
          <Text style={styles.emptyStateTitle}>まだ分析結果がありません</Text>
          <Text style={styles.emptyStateDescription}>
            舌の写真を撮影すると、{"\n"}
            ここに分析結果が表示されます
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope_700Bold",
    color: "#2C3E50",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: "Manrope_700Bold",
    color: "#2C3E50",
    marginBottom: 12,
  },
  emptyStateDescription: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#7F8C8D",
    textAlign: "center",
    lineHeight: 24,
  },
});
