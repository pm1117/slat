import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "AnalysisDetail">;

export default function AnalysisDetailScreen({ navigation }: Props) {
  const handleViewPlan = () => {
    // TODO: 改善プラン画面へ遷移
    console.log("Navigate to improvement plan");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>姿勢分析結果</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Before/After Images */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>分析前</Text>
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="person-outline" size={80} color="#A0AEC0" />
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>分析後</Text>
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="person" size={80} color="#A0AEC0" />
            </View>
          </View>
        </View>

        {/* Overall Score */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Overall Posture Score: <Text style={styles.scoreHighlight}>B</Text>
          </Text>
        </View>

        {/* Key Indicators */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>主要な姿勢指標</Text>

          {/* Head */}
          <View style={styles.indicatorItem}>
            <Text style={styles.indicatorLabel}>Head</Text>
            <View style={styles.barContainer}>
              <View style={[styles.bar, styles.barRed, { width: "60%" }]} />
            </View>
          </View>

          {/* Pelvis */}
          <View style={styles.indicatorItem}>
            <Text style={styles.indicatorLabel}>Pelvis</Text>
            <View style={styles.barContainer}>
              <View style={[styles.bar, styles.barGreen, { width: "90%" }]} />
            </View>
          </View>

          {/* Shoulders */}
          <View style={styles.indicatorItem}>
            <Text style={styles.indicatorLabel}>Shoulders</Text>
            <View style={styles.barContainer}>
              <View style={[styles.bar, styles.barYellow, { width: "70%" }]} />
            </View>
          </View>
        </View>

        {/* Spine Curvature */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>背骨の湾曲分析</Text>
          <View style={styles.graphPlaceholder}>
            <MaterialIcons name="show-chart" size={60} color="#A0AEC0" />
            <Text style={styles.graphText}>グラフ表示エリア</Text>
          </View>
        </View>

        {/* Detailed Analysis */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Detailed Analysis</Text>

          {/* Forward Head Posture */}
          <TouchableOpacity style={styles.detailItem}>
            <View style={[styles.detailIcon, styles.detailIconRed]}>
              <MaterialIcons name="warning" size={24} color="#E53E3E" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Forward Head Posture</Text>
              <Text style={[styles.detailStatus, styles.statusSevere]}>
                Severe
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#A0AEC0" />
          </TouchableOpacity>

          {/* Shoulder Imbalance */}
          <TouchableOpacity style={styles.detailItem}>
            <View style={[styles.detailIcon, styles.detailIconBlue]}>
              <MaterialIcons name="balance" size={24} color="#3498DB" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Shoulder Imbalance</Text>
              <Text style={[styles.detailStatus, styles.statusModerate]}>
                Moderate
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#A0AEC0" />
          </TouchableOpacity>

          {/* Pelvic Tilt */}
          <TouchableOpacity style={styles.detailItem}>
            <View style={[styles.detailIcon, styles.detailIconGreen]}>
              <MaterialIcons name="check-circle" size={24} color="#38A169" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Pelvic Tilt</Text>
              <Text style={[styles.detailStatus, styles.statusGood]}>Good</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        {/* Past Analysis */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>過去の分析結果</Text>

          <TouchableOpacity style={styles.historyItem}>
            <Text style={styles.historyDate}>2023年10月28日</Text>
            <View style={styles.historyRight}>
              <Text style={styles.historyScore}>総合スコア: B</Text>
              <MaterialIcons name="chevron-right" size={20} color="#A0AEC0" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyItem}>
            <Text style={styles.historyDate}>2023年9月15日</Text>
            <View style={styles.historyRight}>
              <Text style={styles.historyScore}>総合スコア: C</Text>
              <MaterialIcons name="chevron-right" size={20} color="#A0AEC0" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyItem}>
            <Text style={styles.historyDate}>2023年8月1日</Text>
            <View style={styles.historyRight}>
              <Text style={styles.historyScore}>総合スコア: C</Text>
              <MaterialIcons name="chevron-right" size={20} color="#A0AEC0" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Ad Notice */}
        <Text style={styles.adNotice}>5秒間の広告が表示されます</Text>

        {/* Action Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleViewPlan}>
          <Text style={styles.actionButtonText}>改善プランを見る</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  imageContainer: {
    flex: 1,
  },
  imageLabel: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  imagePlaceholder: {
    aspectRatio: 3 / 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
  },
  scoreHighlight: {
    color: "#3498DB",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Manrope_700Bold",
    color: "#2D3748",
    marginBottom: 16,
  },
  indicatorItem: {
    marginBottom: 16,
  },
  indicatorLabel: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 8,
  },
  barContainer: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 4,
  },
  barRed: {
    backgroundColor: "#FC8181",
  },
  barGreen: {
    backgroundColor: "#68D391",
  },
  barYellow: {
    backgroundColor: "#F6AD55",
  },
  graphPlaceholder: {
    height: 200,
    backgroundColor: "#F7FAFC",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  graphText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#A0AEC0",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailIconRed: {
    backgroundColor: "#FED7D7",
  },
  detailIconBlue: {
    backgroundColor: "#BEE3F8",
  },
  detailIconGreen: {
    backgroundColor: "#C6F6D5",
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    marginBottom: 4,
  },
  detailStatus: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
  },
  statusSevere: {
    color: "#E53E3E",
  },
  statusModerate: {
    color: "#3498DB",
  },
  statusGood: {
    color: "#38A169",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  historyDate: {
    fontSize: 14,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
  },
  historyRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  historyScore: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#718096",
  },
  adNotice: {
    fontSize: 12,
    fontFamily: "Manrope_400Regular",
    color: "#A0AEC0",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  actionButton: {
    marginHorizontal: 20,
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  bottomSpacer: {
    height: 40,
  },
});
