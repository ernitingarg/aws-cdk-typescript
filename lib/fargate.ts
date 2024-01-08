import env from "../backend/src/config";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_dynamodb as dynamodb,
  aws_ec2 as ec2,
  aws_ecs as ecs,
  aws_ecs_patterns as ecs_patterns,
} from "aws-cdk-lib";

export class FargateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpc = new ec2.Vpc(this, `${env.PROJECT_NAME}_vpc`, {
      maxAzs: 2,
    });

    // Create fargate cluster
    const cluster = new ecs.Cluster(this, `${env.PROJECT_NAME}_cluster`, {
      vpc: vpc,
    });

    // Create dynamodb table
    const table = new dynamodb.Table(this, `${env.TABLE_NAME}`, {
      partitionKey: {
        name: "Id",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create ecs fargate service
    const fargateService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        `${env.PROJECT_NAME}_ecs`,
        {
          cluster: cluster,
          cpu: Number(env.AWS_FARGATE_CONTAINER_CPU),
          memoryLimitMiB: Number(env.AWS_FARGATE_CONTAINER_MEMORY),
          desiredCount: 1,
          taskImageOptions: {
            image: ecs.ContainerImage.fromAsset("backend/"),
            environment: {
              PORT: `${env.PORT}`,
              AWS_DYNAMODB_TABLE_NAME: table.tableName,
            },
            containerPort: Number(env.PORT),
          },
        }
      );

    // Health check
    fargateService.targetGroup.configureHealthCheck({
      path: "/healthcheck",
    });

    // Grant ECS task permissions to access the DynamoDB table
    table.grantReadWriteData(fargateService.taskDefinition.taskRole);

    // Output load balancer url
    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });

    // Output the DynamoDB table name
    new cdk.CfnOutput(this, "DynamoDBTableName", {
      value: table.tableName,
    });
  }
}
