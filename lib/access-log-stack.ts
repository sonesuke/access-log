import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as firehose from "aws-cdk-lib/aws-kinesisfirehose";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigw from "aws-cdk-lib/aws-apigateway";

export interface AccessLogStackProp extends cdk.StackProps {
  bucketName: string;
  streamName: string;
  crossOrigin: [string];
  intervalInSeconds: number;
  sizeInMBs: number;
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
          intervalInSeconds: 60,
          sizeInMBs: 1,
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
  }
}
