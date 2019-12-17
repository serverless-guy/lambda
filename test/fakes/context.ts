import { Context } from "aws-lambda";

export const context: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "test-handler",
  functionVersion: "1",
  invokedFunctionArn: "arn:::*",
  memoryLimitInMB: "1024",
  awsRequestId: "0000000",
  logGroupName: "/aws/lambda/test-handler",
  logStreamName: "/aws/lambda/test-handler",
  getRemainingTimeInMillis: () => 11230,
  done: () => true,
  succeed: () => true,
  fail: () => false
};
