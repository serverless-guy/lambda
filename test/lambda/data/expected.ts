export const resolver200response = {
  body: JSON.stringify({ hello: "world" }),
  headers: { "Access-Control-Allow-Origin": "*" },
  statusCode: 200
}
export const resolver200responseEvent = {
  body: "{\"body\":\"{hello:\\\"world\\\"}\",\"queryStringParameters\":{\"q\":\"samplekeyword\"}}",
  headers: { "Access-Control-Allow-Origin": "*" },
  statusCode: 200
}

export const resolver400response = {
  body: JSON.stringify({ error: "invalid input" }),
  headers: { "Access-Control-Allow-Origin": "*" },
  statusCode: 400
}

export const resolver500response = {
  body: JSON.stringify({ errorCode: "Error", errorMessage: "invalid input" }),
  headers: { "Access-Control-Allow-Origin": "*" },
  statusCode: 500
}
