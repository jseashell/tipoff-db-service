import type { AWS } from '@serverless/typescript';

import hello from '@functions/create-user';

const serverlessConfiguration: AWS = {
  service: 'tipoff-db-service',
  frameworkVersion: '3',
  plugins: ['serverless-bundle', 'serverless-offline'],
  custom: {
    deploymentBucket: 'deployments-${aws:accountId}-${self:provider.region}',
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: '${opt:stage, "dev"}',
    region: 'us-east-1',
    deploymentBucket: { name: '${self:custom.deploymentBucket}' },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    logs: {
      restApi: {
        executionLogging: true,
        accessLogging: false,
      },
    },
  },
  functions: { hello },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
