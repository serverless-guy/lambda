import { Request } from "../../../src/types/request.type";
import { Responser } from "../../../src/types/responser.type";

export function validation(request: Request, response: Responser) {
  const { event } = request;

  const parsedBody = JSON.parse(event.body);

  return response({
    user: event.requestContext.identity.user,
    message: parsedBody.sampleValue1
  });
}

