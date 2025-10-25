import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function SettingsScreen() {
  const handleLogout = () => {
    // TODO: ログアウト処理を実装
    console.log("Logout");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>設定</Text>
      </View>

      <View style={styles.content}>
        {/* アカウント設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>プロフィール編集</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>パスワード変更</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 通知設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>通知設定</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* アプリ情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アプリ情報</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>利用規約</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>プライバシーポリシー</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>バージョン</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>

        {/* ログアウト */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>ログアウト</Text>
        </TouchableOpacity>
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
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#7F8C8D",
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#2C3E50",
  },
  menuItemArrow: {
    fontSize: 24,
    color: "#B0B0B0",
  },
  versionText: {
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    color: "#7F8C8D",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#E74C3C",
  },
});
