import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/navigation";
import Svg, { Path, Line, Text as SvgText } from "react-native-svg";

type Props = NativeStackScreenProps<HomeStackParamList, "AnalysisDetail">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRAPH_WIDTH = SCREEN_WIDTH - 80; // カードのパディングを考慮
const GRAPH_HEIGHT = 200;
const GRAPH_PADDING = 40;
const GRAPH_INNER_WIDTH = GRAPH_WIDTH - GRAPH_PADDING * 2;
const GRAPH_INNER_HEIGHT = GRAPH_HEIGHT - GRAPH_PADDING * 2;

// グラフデータ（画像の説明に基づく）
// X軸: C1, T1, L1, S1 (4ポイント)
// 青い実線のデータ - 波打つような変動
const blueLineData = [
  { x: 0, y: 0.7 }, // C1のあたりでピーク
  { x: 0.2, y: 0.3 }, // 下降
  { x: 0.33, y: 0.5 }, // T1の手前で再びピーク
  { x: 0.4, y: 0.2 }, // T1のあたりで下降
  { x: 0.66, y: 0.1 }, // L1のあたりで大きく下降
  { x: 0.85, y: 0.6 }, // 急上昇
  { x: 1, y: 0.4 }, // S1に向かって緩やかに下降
];

// 赤い破線のデータ - 青い線とは異なるピークと谷
const redLineData = [
  { x: 0, y: 0.6 }, // C1の手前でピーク
  { x: 0.1, y: 0.3 }, // C1のあたりで下降
  { x: 0.5, y: 0.7 }, // T1とL1の間でピーク
  { x: 0.66, y: 0.3 }, // L1のあたりで下降
  { x: 0.9, y: 0.8 }, // S1のあたりで急上昇
  { x: 1, y: 0.75 }, // 終点
];

// データポイントをグラフ座標に変換
const normalizePoint = (point: { x: number; y: number }) => {
  const x = GRAPH_PADDING + point.x * GRAPH_INNER_WIDTH;
  // Y軸は反転（上から下へ）
  const y = GRAPH_PADDING + GRAPH_INNER_HEIGHT - point.y * GRAPH_INNER_HEIGHT;
  return { x, y };
};

// パスを生成
const createPath = (data: { x: number; y: number }[]) => {
  const points = data.map(normalizePoint);
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    // 滑らかな曲線にするため、前後の点を使ってベジェ曲線を描画
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1] || curr;
    const cp1x = prev.x + (curr.x - prev.x) * 0.5;
    const cp1y = prev.y;
    const cp2x = curr.x - (next.x - curr.x) * 0.5;
    const cp2y = curr.y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }
  return path;
};

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
              <Image
                source={require("../../../assets/human.png")}
                style={styles.postureImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>分析後</Text>
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("../../../assets/human.png")}
                style={styles.postureImage}
                resizeMode="contain"
              />
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
          <View style={styles.graphContainer}>
            {/* @ts-expect-error - react-native-svg types incompatible with React 19 */}
            <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
              {/* ベースライン（赤い破線） */}
              {/* @ts-expect-error - react-native-svg types incompatible with React 19 */}
              <Line
                x1={GRAPH_PADDING}
                y1={GRAPH_PADDING + GRAPH_INNER_HEIGHT}
                x2={GRAPH_PADDING + GRAPH_INNER_WIDTH}
                y2={GRAPH_PADDING + GRAPH_INNER_HEIGHT}
                stroke="#E53E3E"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* 青い実線 */}
              {/* @ts-expect-error - react-native-svg types incompatible with React 19 */}
              <Path
                d={createPath(blueLineData)}
                fill="none"
                stroke="#3498DB"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 赤い破線 */}
              {/* @ts-expect-error - react-native-svg types incompatible with React 19 */}
              <Path
                d={createPath(redLineData)}
                fill="none"
                stroke="#E53E3E"
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            {/* X軸ラベル（通常のTextコンポーネントで表示） */}
            <View style={styles.graphLabels}>
              <Text style={styles.graphLabel}>C1</Text>
              <Text style={styles.graphLabel}>T1</Text>
              <Text style={styles.graphLabel}>L1</Text>
              <Text style={styles.graphLabel}>S1</Text>
            </View>
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
    overflow: "hidden",
  },
  postureImage: {
    width: "100%",
    height: "100%",
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
  graphContainer: {
    height: GRAPH_HEIGHT + 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  graphLabels: {
    flexDirection: "row",
    width: GRAPH_WIDTH - GRAPH_PADDING * 2,
    justifyContent: "space-between",
    paddingHorizontal: GRAPH_PADDING,
    marginTop: 4,
  },
  graphLabel: {
    fontSize: 12,
    fontFamily: "Manrope_500Medium",
    color: "#2D3748",
    textAlign: "center",
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
