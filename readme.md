# @serverless-guy/lambda  
  
A small lambda wrapper that lets you write cleaner and maintainable lambda function  
  
Version 3.x focuses on removing stuffs that does not make sense and providing a little bit "lambda"-ish familiarity.
  
## Status  
[![Build Status][travis-image]][travis-url]
[![Bundle Size][bundlephobia]][bundlephobia-url]
[![install size](https://packagephobia.now.sh/badge?p=@serverless-guy/lambda@latest)](https://packagephobia.now.sh/result?p=@serverless-guy/lambda@latest)
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![Snyk][vulnerability]][vulnerability-url]
[![CodeFactor](https://www.codefactor.io/repository/github/serverless-guy/lambda/badge)](https://www.codefactor.io/repository/github/serverless-guy/lambda)
[![Debt][techdebt]][techdebt-url]
[![Issues][issues]][issues-url]
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

export const handler = wrapper(function someHandler(event, context, response) {

  console.log(event);
  console.log(context);

  return response(event);
});
```
  
### Using custom response function  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";

export const handler = wrapper(function someHandler(event, context, response) {
  console.log(event);
  console.log(context);

  return response(event);
});

handler.setResponseFunction(customResponseTemplate);

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

```
### Using custom error response function  
  
```javascript
import { wrapper } from "@serverless-guy/lambda";
 
export const handler = wrapper(function someHandler(event, context, response) {
  console.log(event);
  console.log(context);

  return response(event);
});

handler.setCatchFunction(customCatchResponseTemplate);

function customCatchResponseTemplate(error, event, context, responseFunction) {
  const errorResponseObject = {
    errorCode:    error.name,
    errorMessage: error.message
  };

  return response(errorResponseObject, 418); /** I'm a f***ing teapot */
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