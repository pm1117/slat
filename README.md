# SLAT - 姿勢分析プラットフォーム

Turborepoで構築されたモノレポ構成のフルスタックアプリケーション。

## 📁 プロジェクト構造

```
slat/
├── apps/
│   ├── mobile/          # React Native (Expo) モバイルアプリ
│   └── api/             # NestJS + GraphQL バックエンドAPI
├── packages/
│   ├── types/           # 共通の型定義
│   └── tsconfig/        # 共通のTypeScript設定
├── turbo.json           # Turborepo設定
└── package.json         # ルートワークスペース
```

## 🚀 クイックスタート

### 前提条件

- Node.js 18以上
- npm 10以上
- iOS開発: Xcode、CocoaPods
- Android開発: Android Studio、JDK

### インストール

```bash
# ルートディレクトリで全ての依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
# 全てのアプリを同時に起動
npm run dev

# または個別に起動
cd apps/api && npm run dev      # APIサーバー (http://localhost:3000)
cd apps/mobile && npm run dev   # Expoサーバー
```

## 📱 Mobile App (apps/mobile)

React Native + Expoで構築されたモバイルアプリケーション。

### 主な技術スタック

- React Native 0.79
- Expo 53
- React Navigation 6
- TypeScript
- Manrope フォント

### コマンド

```bash
cd apps/mobile

npm run dev          # Expo開発サーバー起動
npm run ios          # iOSシミュレータで起動
npm run android      # Androidエミュレータで起動
npm run type-check   # 型チェック
```

### 主な機能

- オンボーディングフロー
- 写真撮影・選択（前面・側面）
- ユーザー登録（メール、Google、Apple）
- ホーム画面（姿勢分析結果表示）
- 分析詳細画面
- ボトムタブナビゲーション

## 🔧 API Server (apps/api)

NestJS + GraphQLで構築されたバックエンドAPI。

### 主な技術スタック

- NestJS 11
- GraphQL (Apollo Server)
- TypeScript
- Jest（テスト）

### コマンド

```bash
cd apps/api

npm run dev          # 開発サーバー起動（ホットリロード）
npm run build        # 本番用ビルド
npm run start:prod   # 本番サーバー起動
npm run lint         # リンター実行
npm run test         # テスト実行
npm run type-check   # 型チェック
```

### GraphQL Playground

開発サーバー起動後、以下のURLでGraphQL Playgroundにアクセス可能：
- http://localhost:3000/graphql

## 📦 Packages

### @slat/types (packages/types)

モバイルアプリとAPIで共有される型定義。

```typescript
import { User, PostureAnalysis } from '@slat/types';
```

### @slat/tsconfig (packages/tsconfig)

共通のTypeScript設定。

```json
{
  "extends": "@slat/tsconfig/nestjs.json"
}
```

## 🔨 Turboコマンド

```bash
# 全てのアプリを開発モードで起動
npm run dev

# 全てのアプリをビルド
npm run build

# 全てのアプリで型チェック
npm run type-check

# 全てのアプリでリント
npm run lint

# キャッシュをクリーン
npm run clean
```

## 🌲 Git管理

```bash
# ルートから全体をコミット
git add .
git commit -m "feat: 新機能追加"

# 特定のアプリのみコミット
git add apps/mobile
git commit -m "feat(mobile): モバイル機能追加"
```

### ポート競合

```bash
# ポート3000が使用中の場合、APIのポートを変更
cd apps/api
PORT=3001 npm run dev
```

### キャッシュエラー

```bash
# Turboキャッシュをクリア
rm -rf .turbo

# node_modulesを再インストール
rm -rf node_modules apps/*/node_modules
npm install
```

### Expo関連エラー

```bash
cd apps/mobile
npx expo start -c  # キャッシュクリア
```

## 📄 ライセンス

Private - All rights reserved

