import { RemovalPolicy } from 'aws-cdk-lib'
import { BlockPublicAccess, Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface DataStoresProps {
  domainName: string,

}
export class DataStores extends Construct {

  readonly frontEndBucket: Bucket;
  readonly mediaBucket: Bucket;
  
  constructor(scope: Construct, id: string, props?: DataStoresProps) {
    super(scope, id);

    this.frontEndBucket = new Bucket(this, 'S3Bucket', {
      bucketName: props?.domainName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedMethods: [
            HttpMethods.GET,
          ],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    });

    this.mediaBucket = new Bucket(this, 'imagesBucket', {
      bucketName: `images.${props?.domainName}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

  }


}
