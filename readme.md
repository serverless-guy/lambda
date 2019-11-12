# @serverless-guy/lambda  
[![codecov](https://codecov.io/gh/serverless-guy/lambda/branch/2.0/graph/badge.svg)](https://codecov.io/gh/serverless-guy/lambda)
[![Build Status][travis-image]][travis-url]
[![Greenkeeper badge][greenkeeper-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]  
  
AWS Lambda wrapper that allows you to write class based handlers.  
  
  
# Installation  
  
You can start by installing this library using the command below:  
  
```sh
npm i --save @serverless-guy/lambda
```
  
# Usage  
  
## Basic Usage 
  
```javascript
import { wrapper } from "@serverless-guy/lambda";

// your wrapper that returns the actual handler
export const handler = wrapper(someHandler);

// your handler
function someHandler(request, response) {
  // both event and context are located in request parameter
  const { event, context } = request;

  console.log(event);
  console.log(context);

  // by default, response function stringifies your object
  return response(event);
}
```
## Using middleware  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";

// your wrapper that returns the actual handler
export const handler = wrapper(someHandler);

function parse(body) {
  if (!body) {
    return {}
  }

  return JSON.parse(body);
}

// our middleware
export function checkBody(request, next) {
  const { event } = request;

  const body = parse(event.body);

  if (!body.sampleValue1) {
    throw new Error("Validation Failed");
  }

  return next(request);
}

// add the middleware
handler.pushMiddleware(checkBody);

// your handler
function someHandler(request, response) {
  // both event and context are located in request parameter
  const { event, context } = request;

  const body = JSON.parse(event.body);
  console.log(context);

  // by default, response function stringifies your object
  return response({ message: body.sampleValue1 });
}
```  
  
## Using custom response function  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";

// your wrapper that returns the actual handler
export const handler = wrapper(someHandler);

// set the response template function
handler.setResponseTemplate(customResponseTemplate);

// your custom response template function
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

// your handler
function someHandler(request, response) {
  // both event and context are located in request parameter
  const { event, context } = request;

  console.log(event);
  console.log(context);

  // by default, response function stringifies your object
  return response(event);
}
```
## Using custom error response function  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";
 
// your wrapper that returns the actual handler
export const handler = wrapper(someHandler);

// set the response template function
handler.setCatchTemplate(customCatchResponseTemplate);

// your custom error response template function
function customCatchResponseTemplate(error, responseFunction) {
  // do something
  const errorResponseObject = {
    errorCode:    error.name,
    errorMessage: error.message
  };

  return response(errorResponseObject, 418); /** I'm a f***ing teapot */
}

// your handler
function someHandler(request, response) {
  // both event and context are located in request parameter
  const { event, context } = request;

  console.log(event);
  console.log(context);

  // by default, response function stringifies your object
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