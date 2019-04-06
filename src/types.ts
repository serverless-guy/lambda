import {
  APIGatewayEvent,
  CloudWatchLogsEvent,
  CognitoUserPoolEvent,
  DynamoDBStreamEvent,
  Context,
  S3Event,
  ScheduledEvent,
  SNSEvent,
  SQSEvent
} from "aws-lambda"

export interface HandlerObject {
  after?: MiddlewareFunction[],

  before?: MiddlewareFunction[],

  handler: HandlerFunction,

  errorHandler?: ErrorHandlerFunction
}

export type HandlerEvent = APIGatewayEvent
| CloudWatchLogsEvent
| CognitoUserPoolEvent
| DynamoDBStreamEvent
| S3Event
| ScheduledEvent
| SNSEvent
| SQSEvent

export interface RequestObject {
  event: HandlerEvent,

  context: Context
}

export type PromiseCallback = <T>(params: T) => T

export type MiddlewareFunction = (request: RequestObject, next: PromiseCallback) => Promise<any> | any

export type ErrorHandlerFunction = (error: Error, responser: ResponserFunction) => void

export type ResponserFunction = (...params: any) => any

export type HandlerFunction = (request: RequestObject, responser?: ResponserFunction, next?: PromiseCallback) => Promise<any>

export type WrappedHandlerFunction = (event: HandlerEvent, context: Context) => Promise<any>