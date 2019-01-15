# @serverless-guy/lambda  
[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]  
  
Just another serverless AWS lambda utility library  
  
# Installation  
  
You can start by installing this library using the command below:  
  
```sh
npm i --save @serverless-guy/lambda
```
  
# Usage  
  
## Wrapping your HTTP lambda functions  
  
```javascript
import { wrapper } from "@serverless-guy/lambda"

/**
 * A lambda function that returns details about the user
 * @param event APIGatewayEvent
 */
export const handler = wrapper(function(event) {
  const requestBody = JSON.parse(event.body)

  /** DynamoWrapper is an imaginary dynamo db wrapper **/
  return DynamoWrapper.find(requestBody.user_id)
})
```  
  
## Controlling your status code  
  
It is also possible to control the status code using this utility.  
  
```javascript
import { wrapper } from "@serverless-guy/lambda"

/**
 * A lambda function that returns details about the user after its creation
 * @param event APIGatewayEvent
 */
export const handler = wrapper(function(event, response) {
  const requestBody = JSON.parse(event.body)

  /** DynamoWrapper is an imaginary dynamo db wrapper **/
  const data = DynamoWrapper.create(requestBody)

  /** here we return data together with 201 status code **/
  return data.then((created) => response({
    ...created
  }, 201))
})

```  
  
## Middlewares (supports "before" middleware only... for now)  
  
```javascript
import { wrapper } from "@serverless-guy/lambda"

/**
 * only preprocess action has access to context
 * which makes it suitable for logging everything you need before
 * executing your actual lambda function
 * @param request Object
 * @param request.event APIGatewayEvent
 * @param request.context Context
 * @param next function that calls next middleware
 */
function beforeMiddleware(request, next) {
   console.log({
    pathParams:  request.event.pathParameters,
    queryString: request.event.queryStringParameters
   })

   return next()
}

/**
 * A lambda function that returns details about the user after its creation
 * @param event APIGatewayEvent
 * @param response responseFunction
 */
function lambdaFunction(event, response) {
  const requestBody = JSON.parse(event.body)

  /** DynamoWrapper is an imaginary dynamo db wrapper **/
  const data = DynamoWrapper.create(requestBody)

  /** here we return data together with 201 status code **/
  return data.then((created) => response({
    ...created
  }, 201))
}

/**
 * handler
 */
export const handler = wrapper(lambdaFunction, undefined, beforeMiddleware)
```  
  
## Error handling  
  
By default, there's an error handler already included (but returns 500 status only), You may pass your own error handler as second argument of the `lambdaWrapper` function  
  
```javascript
import { wrapper, responser } from "@serverless-guy/lambda"

/**
 * only preprocess action has access to context
 * which makes it suitable for logging everything you need before
 * executing your actual lambda function
 * @param event APIGatewayEvent
 * @param context Context
 */
function beforeMiddleware(request, next) {
   console.log({
    pathParams:  request.event.pathParameters,
    queryString: request.event.queryStringParameters
   })

   return next()
}

/**
 * Throws 500 every time it receives an error
 * @param event APIGatewayEvent
 * @param error Error
 */
function errorHandler(event, error) {
  return responser({
    message: error.message,
    code: error.name
  }, 500)
}

/**
 * A lambda function that returns details about the user after its creation
 * @param event APIGatewayEvent
 * @param response responseFunction
 */
function lambdaFunction(event, response) {
  const requestBody = JSON.parse(event.body)

  /** DynamoWrapper is an imaginary dynamo db wrapper **/
  const data = DynamoWrapper.create(requestBody)

  /** here we return data together with 201 status code **/
  return data.then((created) => response({
    ...created
  }, 201))
}

/**
 * handler
 */
export const handler = wrapper(lambdaFunction, errorHandler, beforeMiddleware)
```  
  
## Multiple before middlewares  
  
```javascript
import { wrapper, responser } from "@serverless-guy/lambda"

/**
 * only preprocess action has access to context
 * which makes it suitable for logging everything you need before
 * executing your actual lambda function
 * @param event APIGatewayEvent
 * @param context Context
 */
function beforeMiddleware(request, next) {
   console.log({
    pathParams:  request.event.pathParameters,
    queryString: request.event.queryStringParameters
   })

   return next()
}

/**
 * validate input before the actual lambda function is executed
 * @param event APIGatewayEvent
 * @param context Context
 */
function secondBeforeMiddleware(request, next) {
  const requestBody = JSON.parse(request.event.body)
  const validation = validator(requestBody)

  if (validation.fails()) {
    throw new Error("Failed")
  }

  return next()
}

/**
 * Throws 500 every time it receives an error
 * @param event APIGatewayEvent
 * @param error Error
 */
function errorHandler(event, error) {
  return responser({
    message: error.message,
    code: error.name
  }, 500)
}

/**
 * A lambda function that returns details about the user after its creation
 * @param event APIGatewayEvent
 * @param response responseFunction
 */
function lambdaFunction(event, response) {
  const requestBody = JSON.parse(event.body)

  /** DynamoWrapper is an imaginary dynamo db wrapper **/
  const data = DynamoWrapper.create(requestBody)

  /** here we return data together with 201 status code **/
  return data.then((created) => response({
    ...created
  }, 201))

/**
 * handler
 */
export const handler = wrapper(
  lambdaFunction,
  errorHandler,
  beforeMiddleware,
  secondBeforeMiddleware
)
```  
  
# Non-HTTP Lambdas  
  
Current version now supports non-http lambda
```javascript
import { wrapperNonHttp } from "@serverless-guy/lambda"

/**
 * A lambda function that returns details about the user after its creation
 * @param event APIGatewayEvent
 */
export const handler = wrapperNonHttp(function(event) {
  const requestBody = JSON.parse(event.body)

  return DynamoWrapper.create(requestBody)
})

```  
  
# Example  
  
[@serverless-guy/app-example](https://github.com/serverless-guy/app-example) contains good example how `@serverless-guy/lambda` is used. Feel free to check it out.
# Contributing
  
1. Fork it ([https://github.com/serverless-guy/lambda/fork](https://github.com/serverless-guy/lambda/fork))  
2. Create your feature branch (git checkout -b feature/fooBar)  
3. Commit your changes (git commit -am 'Add some fooBar')  
4. Push to the branch (git push origin feature/fooBar)  
5. Create a new Pull Request  
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@serverless-guy/lambda.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@serverless-guy/lambda
[npm-downloads]: https://img.shields.io/npm/dm/@serverless-guy/lambda.svg?style=flat-square
[travis-image]: https://travis-ci.org/serverless-guy/lambda.svg?branch=dev
[travis-url]: https://travis-ci.org/serverless-guy/lambda
