export const resolver200response = {
  body: JSON.stringify({ hello: "world" }),
  headers: { "Access-Control-Allow-Origin": "*" },
  statusCode: 200
}

export const resolver400response = {
  body: JSON.stringify({ error: "invalid input" }),
  headers: { "Access-Control-Allow-Origin": "*" },
  statusCode: 400
}
