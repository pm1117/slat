import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { Platform } from "react-native";

// iOS/Android実機の場合はローカルIPに変更（例: http://192.168.0.10:4000/graphql）
const DEFAULT_ENDPOINT = "http://localhost:4000/graphql";
const GRAPHQL_ENDPOINT =
  process.env.MOBILE_GRAPHQL_ENDPOINT || DEFAULT_ENDPOINT;

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
  connectToDevTools: __DEV__,
});

