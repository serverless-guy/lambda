import { APIGatewayEvent, Context } from "aws-lambda";
import { Responser } from "../../../src/types/responser.type";

export function validation(event: APIGatewayEvent, context: Context, response: Responser) {
  const parsedBody = typeof event.body === "string" ? JSON.parse(event.body): event.body;

  if (!parsedBody.sampleValue1) {
    throw new Error("Validation Failed");
  }

  return response({
    user: event.requestContext.identity.user,
    message: parsedBody.sampleValue1,
    generatedAt: parsedBody.generatedAt
  });
}
