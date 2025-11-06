// React 19 compatibility fix for React Native
// This file provides type compatibility between React 19 and React Native components
import "react";

declare module "react-native" {
  import { ComponentType } from "react";

  // Override React Native components to be compatible with React 19 JSX types
  // Using ComponentType<any> allows these components to be used as JSX elements
  // This is a workaround for React 19 type compatibility issues
  export const View: ComponentType<any>;
  export const Text: ComponentType<any>;
  export const ScrollView: ComponentType<any>;
  export const Image: ComponentType<any>;
  export const TouchableOpacity: ComponentType<any>;
  export const TextInput: ComponentType<any>;
  export const KeyboardAvoidingView: ComponentType<any>;
  export const Modal: ComponentType<any>;
  export const StyleSheet: any;
  export const Dimensions: any;

  // Animated components
  export namespace Animated {
    export const View: ComponentType<any>;
    export const Text: ComponentType<any>;
    export const Image: ComponentType<any>;
  }
}
