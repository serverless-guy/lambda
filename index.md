## Introduction

[`@serverless-guy/lambda`](https://github.com/serverless-guy/lambda) is a small and humble AWS Lambda function wrapper that let's you write a much more cleaner, shorter lambda function in simplest way possible.  

#### Who should use this?  
  
* [`@serverless-guy/lambda`](https://github.com/serverless-guy/lambda) is for developers who seek a small AWS lambda function wrapper that allows them to reuse existing code (such as response template, "middleware", error handling, etc.) in easiest way possible.
* For developers who uses [`serverless framework`](https://www.serverless.com/framework/docs/providers/aws/) and most likely to work on medium to huge project.
* For anyone who misses [`express JS`](https://expressjs.com/) or [`restify`](http://restify.com/).

#### Who should not use this?  
  
* This is not for the developers who works directly on AWS Console.
* For developers who doesn't want a change.
* For developers who prefers the old fashioned way of doing stuffs.
* For anyone who doesn't like my work, I suppose.
  
### Basic Usage  
  
Suppose you want to write a lambda function that would return _"hello world"_, the code below shows how it is currently done without the wrapper.

```javascript

module.exports = async (event, context) => {
  return {
    body: JSON.stringify({
      message: "hello world"
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 200
  };
};
```

Notice that you still have to set all the basics stuffs if you are to use APIGateway as an event, now take a look how it's done using our handy-dandy ~~notebook~~ wrapper.  
  
```javascript
const { wrapper } = require("@serverless-guy/lambda");

module.exports = wrapper(async (request, response) => {
  return response({
    message: "hello world"
  });
});
```  
  
Not only that we skipped setting of basic headers, and status, we also have made our code cleaner and better.  
  
#### Now what if I want to return a custom status code?  
  
Of course, that's possible too! Take a look at the code below.

```javascript
const { wrapper } = require("@serverless-guy/lambda");

module.exports = wrapper(async (request, response) => {
  const teapotStatus = 418;
  const body = {
    message: "I am a teapot"
  };

  return response(body, teapotStatus);
});
```  
  
#### What about custom headers?  
  
Yes, you can also change that one, Here!  
  
```javascript
const { wrapper } = require("@serverless-guy/lambda");

module.exports = wrapper(async (request, response) => {
  const teapotStatus = 418;
  const body = {
    message: "I am a teapot"
  };
  const headers = {
    "x-api-key": "thiscodeisawesomesoistheapikey"
  };

  return response(body, teapotStatus, headers);
});
```  
  
And that's it for the basic usage!  
  
Check the pages below to get started.  
  
* [wrapper](/wrapper)  
* [Request](/request)  
* [Response](/response)  
* [Middleware](/middleware)  
* [Creating a custom response function](/custom-response-function)  
* [Creating a custom error response function](/custom-error-response-function)  
* [Error handling](/errors)  
  