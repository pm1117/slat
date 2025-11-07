import type { CodegenConfig } from "@graphql-codegen/cli";

// NOTE: 本番はエンドポイント、当面はローカルSDLで型生成
const localSchema = "schema/schema.graphql";
const schemaUrl =
  process.env.MOBILE_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";

const config: CodegenConfig = {
  // APIが未起動でも動くように、まずはローカルSDLを優先
  schema: [localSchema],
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        useTypeImports: true,
        dedupeOperationSuffix: true,
        avoidOptionals: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
