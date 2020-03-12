# @serverless-guy/lambda  
[![codecov](https://codecov.io/gh/serverless-guy/lambda/branch/2.0/graph/badge.svg)](https://codecov.io/gh/serverless-guy/lambda)
[![Build Status][travis-image]][travis-url]
[![Greenkeeper badge][greenkeeper-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![Donate][paypal-image]](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=938FMCPPQG4DQ&currency_code=USD&source=url)
  
The only AWS Lambda wrapper that you will need!  
  
# Installation  
  
You can start by installing this library using the command below:  
  
```sh
npm i --save @serverless-guy/lambda
```
  
# Usage  
  
This wrapper will allow you to write lambda functions in easiest way possible.  
  
The wrapper would take a function and the function would have `Request` as first argument (containing both `event` and `context`) and `Response` as second argument (containing a function that transforms your response).
  
## Basic Usage 
  
In the example below, the handler would log the `event` first, then `context`. Afterwards, it will return the `event` as response.  
```javascript
import { wrapper } from "@serverless-guy/lambda";

export const handler = wrapper(someHandler);

/**
 * Handler that is accepted by our lambda wrapper
 * @param request.event Lambda's event object
 * @param request.context Lambda's context object
 * @param response handy function to return a response
 * @return response
 */
function someHandler(request, response) {
  const { event, context } = request;

  console.log(event);
  console.log(context);

  return response(event);
}
```
## Using middleware  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";

export const handler = wrapper(someHandler);

handler.pushMiddleware(checkBody);

/**
 * Function that parse object string to object
 * @param body object string
 * @return parsed object
 */
function parse(body) {
  if (!body) {
    return {}
  }

  return JSON.parse(body);
}

/**
 * Middleware that is accepted by our lambda wrapper
 * @param request.event Lambda's event object
 * @param request.context Lambda's context object
 * @param next middleware/handler next to this middleware
 * @return next
 */
export function checkBody(request, next) {
  const { event } = request;

  const body = parse(event.body);

  if (!body.sampleValue1) {
    throw new Error("Validation Failed");
  }

  return next(request);
}


/**
 * Handler that is accepted by our lambda wrapper
 * @param request.event Lambda's event object
 * @param request.context Lambda's context object
 * @param response handy function to return a response
 * @return response
 */
function someHandler(request, response) {
  const { event, context } = request;

  const body = JSON.parse(event.body);
  console.log(context);

  return response({ message: body.sampleValue1 });
}
```  
  
## Using custom response function  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";

export const handler = wrapper(someHandler);

handler.setResponseTemplate(customResponseTemplate);

/**
 * Custom response function that is accepted by our lambda wrapper
 * @param data object to be appended as response's body
 * @param statusCode HTTP status code
 * @param headers HTTP headers
 * @return APIGatewayProxyResult
 */
function customResponseTemplate(data, statusCode = 200, headers = {}) {
    // do something
    data.returnedOn = new Date();

    return {
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...headers
    },
    statusCode
  };
}

/**
 * Handler that is accepted by our lambda wrapper
 * @param request.event Lambda's event object
 * @param request.context Lambda's context object
 * @param response handy function to return a response
 * @return response
 */
function someHandler(request, response) {
  const { event, context } = request;

  console.log(event);
  console.log(context);

  return response(event);
}
```
## Using custom error response function  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";
 
export const handler = wrapper(someHandler);

handler.setCatchTemplate(customCatchResponseTemplate);

/**
 * Custom error function that is accepted by our lambda wrapper
 * @param error Error object
 * @param request event and context
 * @param responseFunction Response function
 * @return APIGatewayProxyResult
 */
function customCatchResponseTemplate(error, request, responseFunction) {
  const errorResponseObject = {
    errorCode:    error.name,
    errorMessage: error.message
  };

  return response(errorResponseObject, 418); /** I'm a f***ing teapot */
}

/**
 * Handler that is accepted by our lambda wrapper
 * @param request.event Lambda's event object
 * @param request.context Lambda's context object
 * @param response handy function to return a response
 * @return response
 */
function someHandler(request, response) {
  const { event, context } = request;

  console.log(event);
  console.log(context);

  return response(event);
}
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
[travis-image]: https://travis-ci.org/serverless-guy/lambda.svg?branch=2.0
[travis-url]: https://travis-ci.org/serverless-guy/lambda
[greenkeeper-image]: https://badges.greenkeeper.io/serverless-guy/lambda.svg
[paypal-image]: https://img.shields.io/badge/Donate-PayPal-green.svg