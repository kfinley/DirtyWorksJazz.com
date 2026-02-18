import { PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import * as cdk from 'aws-cdk-lib/core';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends cdk.Stack {
  private hostedZone: PublicHostedZone;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext('domainName');

    const {
      accountId,
      region,
    } = new cdk.ScopedAws(this);

    // Deploy Step 1: Create Hosted Zone
    const step1 = () => {
      this.hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
        zoneName: domainName,
        comment: `Hosted zone for ${domainName}`
      });
    };
  }
}
