import { Request } from "../../../src/types/request.type";
import { Responser } from "../../../src/types/responser.type";

export function validation(request: Request, response: Responser) {
  const { event } = request;

  const parsedBody = typeof event.body === "string" ? JSON.parse(event.body): event.body;

  return response({
    user: event.requestContext.identity.user,
    message: parsedBody.sampleValue1,
    generatedAt: parsedBody.generatedAt
  });
}

