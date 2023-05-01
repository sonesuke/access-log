import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as firehose from "aws-cdk-lib/aws-kinesisfirehose";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as cloudwatch_action from "aws-cdk-lib/aws-cloudwatch-actions";
import * as sns from "aws-cdk-lib/aws-sns";
import * as athena from "aws-cdk-lib/aws-athena";
import * as glue from "@aws-cdk/aws-glue-alpha";

export interface AccessLogStackProp extends cdk.StackProps {
  bucketName: string;
  streamName: string;
  crossOrigin: [string];
  intervalInSeconds: number;
  sizeInMBs: number;
  athenaQueryResultBucketName: string;
}

export class AccessLogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AccessLogStackProp) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this, "AccessLogBucket", {
      bucketName: props.bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // The Role for Firehose to access S3 bucket
    const kinesisRole = new iam.Role(this, "AccessLogStreamRole", {
      assumedBy: new iam.ServicePrincipal("firehose.amazonaws.com"),
    });
    kinesisRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "s3:AbortMultipartUpload",
          "s3:GetBucketLocation",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:ListBucketMultipartUploads",
          "s3:PutObject",
        ],
        resources: [bucket.bucketArn, bucket.bucketArn + "/*"],
      })
    );

    // The Firehose Stream
    const stream = new firehose.CfnDeliveryStream(this, "AccessLogFirehose", {
      deliveryStreamName: props.streamName,
      deliveryStreamType: "DirectPut",
      s3DestinationConfiguration: {
        bucketArn: bucket.bucketArn,
        bufferingHints: {
          intervalInSeconds: props.intervalInSeconds,
          sizeInMBs: props.sizeInMBs,
        },
        compressionFormat: "GZIP",
        roleArn: kinesisRole.roleArn,
      },
    });

    // The Role for Firehose to access S3 bucket
    const apiRole = new iam.Role(this, "AccessLogApiRole", {
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
    });
    apiRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["firehose:PutRecord"],
        resources: [stream.attrArn],
      })
    );

    // add API Gateway for stream
    const api = new apigw.RestApi(this, "AccessLogApi", {
      restApiName: "AccessLogApi",
      endpointTypes: [apigw.EndpointType.REGIONAL],
      deployOptions: {
        stageName: "api",
      },
    });
    const integrationResponses = [
      {
        statusCode: "200",
        responseParameters: {
          "method.response.header.Access-Control-Allow-Origin": `'${props.crossOrigin.join(
            ","
          )}'`,
          "method.response.header.Strict-Transport-Security":
            "'max-age=31536000; includeSubDomains'",
          "method.response.header.X-Content-Type-Options": "'nosniff'",
        },
        responseTemplates: {
          "application/json": "",
        },
      },
    ];
    const methodResponses = [
      {
        statusCode: "200",
        responseParameters: {
          "method.response.header.Access-Control-Allow-Origin": true,
          "method.response.header.Strict-Transport-Security": true,
          "method.response.header.X-Content-Type-Options": true,
        },
      },
    ];
    api.root.addMethod(
      "OPTIONS",
      new apigw.MockIntegration({
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
        integrationResponses,
        passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_TEMPLATES,
      }),
      {
        methodResponses,
      }
    );
    api.root.addMethod(
      "POST",
      new apigw.AwsIntegration({
        service: "firehose",
        region: "ap-northeast-1",
        action: "PutRecord",
        integrationHttpMethod: "POST",
        options: {
          credentialsRole: apiRole,
          passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_TEMPLATES,
          requestTemplates: {
            // https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/models-mappings.html
            // exression by VTL
            "application/json": `
              #set($time = '"time": "' + \${context.requestTime} + '",')
              #set($ip = '"ip": "' + \${context.identity.sourceIp} + '",')
              #set($data = '"data": "' + $input.json('$') + '"')
              #set($body = "{\${time}\${ip}\${data}}
")
              {
                "DeliveryStreamName": "${props.streamName}",
                "Record": {
                  "Data": "$util.base64Encode($body)"
                }
              }`,
          },
          integrationResponses,
        },
      }),
      {
        methodResponses,
      }
    );

    // add your email address to receive alarm
    const topic = new sns.Topic(this, "AccessLogTopic", {
      topicName: "AccessLogTopic",
    });
    //topic.addSubscription(new subs.EmailSubscription("your-email-address"));

    // add alarm for API Gateway Quota
    const apiCallAlarm = new cloudwatch.Alarm(
      this,
      "AccessLogAPIGatewayQuotaAlarm",
      {
        alarmName: "AccessLogAPIGatewayQuotaAlarm",
        comparisonOperator:
          cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
        threshold: 60 * 1000 * 0.8,
        evaluationPeriods: 1,
        metric: new cloudwatch.Metric({
          namespace: "AWS/ApiGateway",
          metricName: "Count",
          statistic: "Sum",
          period: cdk.Duration.minutes(1),
        }),
      }
    );
    apiCallAlarm.addAlarmAction(new cloudwatch_action.SnsAction(topic));

    // add alarm for API Gateway 5XX Error
    const api5XXAlarm = new cloudwatch.Alarm(
      this,
      "AccessLogAPIGateway5XXAlarm",
      {
        alarmName: "AccessLogAPIGateway5XXAlarm",
        comparisonOperator:
          cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
        threshold: 1,
        evaluationPeriods: 1,
        metric: api.metricServerError(),
      }
    );
    api5XXAlarm.addAlarmAction(new cloudwatch_action.SnsAction(topic));

    // add alarm for AWS Firehose Rate Limit
    const rateLimitFirehoseAlarm = new cloudwatch.Alarm(
      this,
      "AccessLogRateLimitFirehoseAlarm",
      {
        alarmName: "AccessLogRateLimitFirehoseAlarm",
        comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
        threshold: 1000,
        evaluationPeriods: 1,
        metric: new cloudwatch.Metric({
          namespace: "AWS/Firehose",
          metricName: "PutRequestsPerSecondLimit",
          dimensionsMap: {
            DeliveryStreamName: props.streamName,
          },
          statistic: "Minimum",
          period: cdk.Duration.minutes(1),
        }),
      }
    );
    rateLimitFirehoseAlarm.addAlarmAction(
      new cloudwatch_action.SnsAction(topic)
    );
    // const athenaQueryResultBucket = new s3.Bucket(
    //   this,
    //   "AthenaQueryResultBucket",
    //   {
    //     bucketName: props.athenaQueryResultBucketName,
    //     removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   }
    // );

    // const dataCatalog = new glue.Database(this, "AccessLogDataCatalog", {
    //   databaseName: "access_log",
    // });

    // const sourceDataGlueTable = new glue.Table(
    //   this,
    //   "AccessLogSourceDataGlueTable",
    //   {
    //     tableName: "source_data",
    //     database: dataCatalog,
    //     columns: [
    //       {
    //         name: "time",
    //         type: glue.Schema.TIMESTAMP,
    //       },
    //       {
    //         name: "ip",
    //         type: glue.Schema.STRING,
    //       },
    //       {
    //         name: "data",
    //         type: glue.Schema.STRING,
    //       },
    //     ],
    //     dataFormat: glue.DataFormat.JSON,
    //     bucket: bucket,
    //   }
    // );

    // const athenaWorkGroup = new athena.CfnWorkGroup(
    //   this,
    //   "AccessLogAthenaWorkGroup",
    //   {
    //     name: "access_log",
    //     workGroupConfiguration: {
    //       resultConfiguration: {
    //         outputLocation: `s3://${props.athenaQueryResultBucketName}/result-data`,
    //       },
    //     },
    //   }
    // );
  }
}
