## wrapper  
  
The `wrapper` is the main ~~protagonist~~ function of the `@serverless-guy/lambda` library, it takes a callback (our custom handler function) as a parameter and returns a fully valid AWS Lambda function.  
  
### Anatomy of the callback function  
  
The callback function accepted by wrapper is the custom handler of your lambda, below is an example of callback/custom handler function  
  
```javascript
function handler(request, response) {
  return response({
    okay: true
  });
}
```  
  
In the example above, the `handler` function is our callback function. It accepts two parameters, `request` as first parameter which contains the Lambda's `event` and `context` and `response` as second parameter, which is a function that would accept 3 parameters.

The first parameter of the default response function is your response body, the second paramter is an optional status code that would defaults to 200 and the third parameter is the optional additional headers.

### Full usage example  
  
```javascript  
function handler(request, response) {
  const { event } = request;
  const status = 200;
  const headers = {
    'X-Powered-By': 'Yo momma\'s ass'
  };

  /** return the event body */
  return response({
    ...JSON.parse(event.body || {});
  }, status);
}
```  
  
Note that the format of `event` and `context` is the same as the lambda's orignal event and context.