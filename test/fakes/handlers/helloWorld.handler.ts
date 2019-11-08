import { Request } from "../../../src/types/request.type";
import { Responser } from "../../../src/types/responser.type";

export function helloWorld(request: Request, response: Responser) {
  const { event } = request;

  return response({
    user: event.requestContext.identity.user,
    message: "Hello World!"
  });
}

