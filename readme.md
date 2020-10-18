# @serverless-guy/lambda  
  
A small lambda wrapper that lets you write cleaner and maintainable lambda function  
  
Version 3.x focuses on removing stuffs that does not make sense and providing a little bit "lambda"-ish familiarity.
  
## Status  
[![Build Status][travis-image]][travis-url]
[![codecov](https://codecov.io/gh/serverless-guy/lambda/branch/2.0/graph/badge.svg)](https://codecov.io/gh/serverless-guy/lambda)
[![Bundle Size][bundlephobia]][bundlephobia-url]
[![install size](https://packagephobia.now.sh/badge?p=@serverless-guy/lambda@latest)](https://packagephobia.now.sh/result?p=@serverless-guy/lambda@latest)
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![Snyk][vulnerability]][vulnerability-url]
[![CodeFactor](https://www.codefactor.io/repository/github/serverless-guy/lambda/badge)](https://www.codefactor.io/repository/github/serverless-guy/lambda)
[![Debt][techdebt]][techdebt-url]
[![Issues][issues]][issues-url]
![David](https://img.shields.io/david/peer/serverless-guy/lambda)
![David](https://img.shields.io/david/dev/serverless-guy/lambda)
![Libraries.io SourceRank](https://img.shields.io/librariesio/sourcerank/npm/@serverless-guy/lambda)
[![License][license]][npm-url]
[![Donate][paypal-image]](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=938FMCPPQG4DQ&currency_code=USD&source=url)
  
## Installation  
  
You can start by installing this library using the command below:  
  
```sh
npm i --save @serverless-guy/lambda
```
  
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
### Using middleware  
  
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
  
### Using custom response function  
  
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
### Using custom error response function  
  
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
  
Check out our [documentation](https://serverless-guy.github.io/lambda) page to see more examples.
  
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@serverless-guy/lambda.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@serverless-guy/lambda
[npm-downloads]: https://img.shields.io/npm/dm/@serverless-guy/lambda.svg?style=flat-square
[travis-image]: https://travis-ci.org/serverless-guy/lambda.svg?branch=2.0
[travis-url]: https://travis-ci.org/serverless-guy/lambda
[paypal-image]: https://img.shields.io/badge/Donate-PayPal-green.svg
[bundlephobia]: https://badgen.net/bundlephobia/minzip/@serverless-guy/lambda
[bundlephobia-url]: https://bundlephobia.com/result?p=@serverless-guy/lambda@latest
[license]: https://img.shields.io/npm/l/@serverless-guy/lambda?color=blue
[vulnerability]: https://img.shields.io/snyk/vulnerabilities/npm/@serverless-guy/lambda
[vulnerability-url]: https://snyk.io/test/npm/@serverless-guy/lambda
[techdebt]: https://img.shields.io/codeclimate/tech-debt/serverless-guy/lambda
[techdebt-url]: https://codeclimate.com/github/serverless-guy/lambda/trends/technical_debt
[issues]: https://img.shields.io/codeclimate/issues/serverless-guy/lambda
[issues-url]: https://codeclimate.com/github/serverless-guy/lambda/issues