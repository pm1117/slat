# ソーシャルログイン設定ガイド

## Google Sign In 設定

### 1. Google Cloud Consoleでプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「APIとサービス」→「認証情報」に移動

### 2. OAuth 2.0 Client IDを作成

#### iOS用Client ID
1. 「認証情報を作成」→「OAuth クライアント ID」
2. アプリケーションの種類：「iOS」
3. バンドルID：`com.mikasuzukidev.slat`
4. 作成後、Client IDをコピー

#### Android用Client ID
1. 「認証情報を作成」→「OAuth クライアント ID」
2. アプリケーションの種類：「Android」
3. パッケージ名：`com.mikasuzukidev.slat`
4. SHA-1証明書フィンガープリント：
   ```bash
   # デバッグ用
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
5. 作成後、Client IDをコピー

#### Web用Client ID（Expo Go開発用）
1. 「認証情報を作成」→「OAuth クライアント ID」
2. アプリケーションの種類：「ウェブアプリケーション」
3. 承認済みのリダイレクトURIに以下を追加：
   - `https://auth.expo.io/@your-expo-username/slat`
4. 作成後、Client IDをコピー

### 3. SignUpScreen.tsxを更新

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
  androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
});
```

取得した3つのClient IDで置き換えてください。

---

## Apple Sign In 設定

### 1. Apple Developer Accountの設定

1. [Apple Developer Console](https://developer.apple.com/account/)にアクセス
2. 「Certificates, Identifiers & Profiles」に移動
3. 「Identifiers」→App IDを選択
4. Bundle ID：`com.mikasuzukidev.slat`
5. 「Sign In with Apple」を有効化

### 2. Xcode設定（Development Build時）

1. Xcodeでプロジェクトを開く
2. 「Signing & Capabilities」タブ
3. 「+ Capability」→「Sign In with Apple」を追加

### 3. app.jsonの確認

すでに`expo-apple-authentication`はインストール済みです。
Development Buildで実行してください：

```bash
npx expo run:ios
```

**注意**: Apple Sign InはExpo Goでは動作しません。

---

## テスト方法

### Google Sign In

```bash
# Development Build（推奨）
npx expo run:ios
npx expo run:android

# Expo Go（限定的）
npx expo start
```

### Apple Sign In

```bash
# Development Buildのみ（必須）
npx expo run:ios
```

iOSシミュレーターでも動作しますが、実機でのテストを推奨します。

---

## トラブルシューティング

### Google Sign Inが動作しない

1. Client IDが正しいか確認
2. Bundle ID / Package Nameが一致しているか確認
3. OAuth同意画面が設定されているか確認
4. キャッシュをクリアして再ビルド：
   ```bash
   rm -rf node_modules .expo ios android
   npm install
   npx expo prebuild --clean
   npx expo run:ios
   ```

### Apple Sign Inが動作しない

1. iOS 13以降のデバイス/シミュレーターを使用
2. Development Buildで実行（Expo Goは非対応）
3. Bundle IDが正しいか確認
4. Apple Developer Consoleで「Sign In with Apple」が有効か確認

---

## 本番環境での注意点

1. **Google Cloud Consoleで本番用OAuth Client IDを作成**
2. **Apple Developer Consoleで本番用App IDを設定**
3. **環境変数で Client IDを管理**（ハードコーディング回避）
4. **バックエンドでトークン検証を実装**

## 参考リンク

- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Expo Apple Authentication](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [Google Sign-In](https://developers.google.com/identity/sign-in/ios/start-integrating)

