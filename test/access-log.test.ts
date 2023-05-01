import { Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import { AccessLogStack } from "../lib/access-log-stack";

test("AccessLogStack created", () => {
  const app = new cdk.App();
  const accessLogStack = new AccessLogStack(app, "AccessLogStack", {
    bucketName: "test-bucket",
    streamName: "tetst-stream",
    crossOrigin: ["*"],
    intervalInSeconds: 60,
    sizeInMBs: 1,
    athenaQueryResultBucketName: "test-athena-bucket"
  });

  expect(Template.fromStack(accessLogStack).toJSON).toMatchSnapshot();
});
