#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FargateStack } from "../lib/fargate";
import env from "../backend/src/config";

const app = new cdk.App();
new FargateStack(app, "FargateStack", {
  env: { account: env.AWS_ACCOUNT, region: env.AWS_REGION },
});
