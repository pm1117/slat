import { NavigatorScreenParams } from "@react-navigation/native";

// 認証関連のナビゲーションパラメータ
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

// メイン画面のボトムタブパラメータ
export type MainTabParamList = {
  Camera: undefined;
  Results: undefined;
  Settings: undefined;
};

// ルートナビゲーションパラメータ
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
