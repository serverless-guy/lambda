import { APIGatewayEvent, Context } from "aws-lambda";
import { Responser } from "../../../src/types/responser.type";

export function helloWorld(event: APIGatewayEvent, context: Context, response: Responser) {

  return response({
    user: event.requestContext.identity.user,
    message: "Hello World!"
  });
}

