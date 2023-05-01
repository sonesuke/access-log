#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AccessLogStack } from "../lib/access-log-stack";

const app = new cdk.App();

const bucketName = app.node.tryGetContext("access-log-bucekt-name") as string;
const streamName = app.node.tryGetContext("access-log-stream-name") as string;
const crossOrigin = app.node.tryGetContext("cross-origin") as [string];
const intervalInSeconds = app.node.tryGetContext("interval-in-seconds") as number;
const sizeInMBs = app.node.tryGetContext("size-in-mbs") as number;
const athenaQueryResultBucketName = app.node.tryGetContext("athena-query-result-bucket-name") as string;

new AccessLogStack(app, "AccessLogStack", {
  bucketName: bucketName,
  streamName: streamName,
  crossOrigin: crossOrigin,
  intervalInSeconds: intervalInSeconds,
  sizeInMBs: sizeInMBs,
  athenaQueryResultBucketName: athenaQueryResultBucketName,
});
