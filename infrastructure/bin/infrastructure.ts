#!/usr/bin/env node
import 'dotenv/config'
import * as cdk from 'aws-cdk-lib/core';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const LOG_LEVEL: "DEBUG" | "INFO" | "WARN" | "ERROR" = "ERROR";

const app = new cdk.App();

const infraStack = new InfrastructureStack(app, `DirtyWorksJazzCom-Infrastructure`, {
  logLevel: LOG_LEVEL,
  node_env: process.env.NODE_ENV as string,
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});

