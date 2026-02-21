import * as cdk from 'aws-cdk-lib/core';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Certificate, DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';
import { DataStores } from './data-stores';

export interface InfraStackProps extends cdk.StackProps {
  logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR";
  node_env: string;
}
export class InfrastructureStack extends cdk.Stack {
  private hostedZone: route53.PublicHostedZone;
  private certificate: DnsValidatedCertificate;
  private cloudFrontDistribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props?: InfraStackProps) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext('domainName');

    const dataStores = new DataStores(this, 'DirtyWorksJazzCom-DataStack', {
      domainName,
    });

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

    // Confirm DNS works using dig before applying step 2
    // Deploy Step 2: Create Certificate
    const step2 = () => {
      this.certificate = new acm.DnsValidatedCertificate(this, 'CertificateManagerCertificate', {
        domainName,
        // subjectAlternativeNames: [`ws.${domainName}`],    // placeholder for getting websocket custom domain working
        hostedZone: this.hostedZone,
        region,
        validation: acm.CertificateValidation.fromDns(),
      });

    }

    // Deploy Step 3, Create Web CF Distro, DNS entry, and S3 BucketDeployment
    const step3 = () => {
      const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'CloudFrontOriginAccessIdentity', {
        comment: `${domainName} Domain Hosting Environment`,
      });

      this.cloudFrontDistribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
        domainNames: [domainName],
        defaultBehavior: {
          origin: new origins.S3Origin(dataStores.frontEndBucket, {
            originAccessIdentity: cloudFrontOAI
          }),
          compress: true,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
        errorResponses: [
          {
            httpStatus: 403,
            responsePagePath: '/403', //TODO: create this page...
            responseHttpStatus: 200,
            ttl: cdk.Duration.minutes(0),
          },
          {
            httpStatus: 404,
            responsePagePath: '/404', //TODO: create this page...
            responseHttpStatus: 200,
            ttl: cdk.Duration.minutes(0),
          },
        ],
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        enabled: true,
        certificate: this.certificate,
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        httpVersion: cloudfront.HttpVersion.HTTP2,
        defaultRootObject: 'index.html',
        enableIpv6: true,
      });

      new route53.ARecord(this, 'ARecord', {
        recordName: domainName,
        zone: this.hostedZone,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.cloudFrontDistribution)
        ),
      });

      new s3deploy.BucketDeployment(this, 'S3BucketDeploy', {
        sources: [s3deploy.Source.asset('../packages/vue-client/dist')],
        destinationBucket: dataStores.frontEndBucket,
        distribution: this.cloudFrontDistribution,
        distributionPaths: ['/*'],
      });

    }

    // Run the steps first with step1 then add the others in another push.
    step1();

    step2();
    
    step3();
    
    new cdk.CfnOutput(this, 'DeployURL', {
      value: `https://${domainName}`,
    });
  }
}
