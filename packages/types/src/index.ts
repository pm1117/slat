// 共通の型定義をここに追加します

// ユーザー関連の型
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 姿勢分析関連の型
export interface PostureAnalysis {
  id: string;
  userId: string;
  frontImageUrl: string;
  sideImageUrl: string;
  overallScore: number;
  createdAt: Date;
}

export interface PostureIndicator {
  name: string;
  score: number;
  status: "good" | "warning" | "danger";
}

// API応答の型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
