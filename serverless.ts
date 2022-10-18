import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

import { createPoke, getPokemon, getAllPokemon } from "@functions/findPokemon";

dotenv.config({ path: __dirname + "/.env" });

const serverlessConfiguration: AWS = {
  service: "serverless-challenge",
  useDotenv: true,
  frameworkVersion: "3",
  plugins: [
    "serverless-offline",
    "serverless-dynamodb-local",
    "serverless-webpack",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    timeout: 300,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: { createPoke, getPokemon, getAllPokemon },
  package: {
    individually: true,
    excludeDevDependencies: true,
    patterns: ["!.git/**", "!.vscode/**", "!.test/**", "!.env", "!.env"],
  },
  custom: {
    dotenv: {
      path: "./.env",
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: { forceInclude: ["pg"] },
      useChildProcesses: true,
    },
    webpackIncludeModules: ["pg"],
  },
};

module.exports = serverlessConfiguration;
